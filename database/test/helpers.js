// Test helpers.
//
// USAGE:
//   const { setupTestSchema, newTestSchema, dropSchema, asPerson,
//           ROOT_ADMIN_HASH } = require("./helpers")
//   setupTestSchema("suite-name")   // MUST be at file top, before any require of ../server
//
// The first call to setupTestSchema(name) sets env vars so that when
// persistence modules load (via newTestSchema below) they pick up an
// isolated schema, and the server bootstrap uses a deterministic test
// email as root admin.
//
// Requires a running local PostgreSQL — see database/docker-compose.dev.yml.

const path = require("path")
const dotenv = require("dotenv")
const { createHash } = require("crypto")

const PROJECT_PATH = path.resolve(__dirname + "/../..")
dotenv.config({ path: PROJECT_PATH + "/settings.ini" })
dotenv.config({ path: PROJECT_PATH + "/secrets.ini" })
dotenv.config({ path: PROJECT_PATH + "/settings.local.ini" })

process.env.DATABASE_TEST_MODE = "1"
process.env.NODE_ENV = "test"
process.env.LOG_LEVEL = process.env.LOG_LEVEL || "warn"

// Point the init module at a deterministic test init file that declares
// TEST_ROOT_ADMIN_EMAIL as the root admin.
const TEST_ROOT_ADMIN_EMAIL = "test-root@electra.local"
process.env.DATABASE_INIT_FILE = path.join(__dirname, "test-init.json")

const ROOT_ADMIN_HASH = createHash("sha256")
  .update(TEST_ROOT_ADMIN_EMAIL)
  .digest("hex")

// Set once by setupTestSchema — every file names itself.
let currentSchema = null

function setupTestSchema(suiteName) {
  if (currentSchema) return currentSchema
  const clean = suiteName.replace(/[^a-z0-9]/gi, "_").toLowerCase()
  currentSchema = `docstore_test_${process.pid}_${clean}_${Date.now()}`
  process.env.PG_DATABASE_SCHEMA = currentSchema
  return currentSchema
}

async function newTestSchema() {
  if (!currentSchema) {
    throw new Error("setupTestSchema(name) must be called before newTestSchema()")
  }

  const { pool } = require("../server/persistence/pool")

  // Drop any leftover from a prior aborted run.
  await pool.query(`DROP SCHEMA IF EXISTS "${currentSchema}" CASCADE`)

  // build() runs migrate + bootstrap internally, so the root scope +
  // canonical structure (users, apps/*) exist right after this returns.
  const { build } = require("../server/index")
  const fastify = await build()

  return { fastify, pool, schema: currentSchema }
}

async function dropSchema(pool, schema) {
  await pool.query(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)
  await pool.end()
}

// Build the ingress-style auth headers for a fake person. Under
// DATABASE_TEST_MODE=1 the server accepts x-hash directly, so tests can
// simulate any identity by picking an arbitrary hash string.
function asPerson(personRef, extra = {}) {
  return {
    "x-role": "user",
    "x-hash": personRef,
    "x-mail": `${personRef}@test.local`,
    ...extra,
  }
}

// Convenience: headers acting as the root admin.
function asRootAdmin(extra = {}) {
  return asPerson(ROOT_ADMIN_HASH, extra)
}

// Headers for an anonymous (not logged-in) caller — no identity at all.
function asAnon(extra = {}) {
  return { "x-role": "anonym", ...extra }
}

// Thin HTTP verb wrappers around fastify.inject so test bodies read like a
// script. Each takes the ctx from newTestSchema().
function get(ctx, url, headers) {
  return ctx.fastify.inject({ method: "GET", url, headers })
}
function put(ctx, url, headers, payload) {
  return ctx.fastify.inject({ method: "PUT", url, headers, payload })
}
function post(ctx, url, headers, payload) {
  return ctx.fastify.inject({ method: "POST", url, headers, payload })
}
function patch(ctx, url, headers, payload) {
  return ctx.fastify.inject({ method: "PATCH", url, headers, payload })
}
function del(ctx, url, headers, payload) {
  return ctx.fastify.inject({ method: "DELETE", url, headers, payload })
}

// Document helpers built on the REST surface (README §9.2). `path` is a query
// parameter everywhere.
const docsUrl = (scopeRef, path) =>
  `/database/scopes/${scopeRef}/docs` + (path ? `?path=${encodeURIComponent(path)}` : "")

function readDoc(ctx, scopeRef, path, headers) {
  return get(ctx, docsUrl(scopeRef, path), headers)
}
function writeDoc(ctx, scopeRef, path, headers, doc) {
  return put(ctx, docsUrl(scopeRef, path), headers, doc)
}

// Create a sub-scope under parentRef (admin only). Returns the new scope id.
async function createScope(ctx, parentRef, name, opts = {}) {
  const res = await post(ctx, `/database/scopes/${parentRef}/scopes`, asRootAdmin(), {
    name,
    requiredApprovalScore: opts.requiredApprovalScore ?? 0,
  })
  if (res.statusCode !== 201) {
    throw new Error(`createScope(${name}) failed: ${res.statusCode} ${res.body}`)
  }
  return res.json().id
}

// Add an explicit member to a scope (admin action).
function addMember(ctx, scopeRef, personRef) {
  return post(ctx, `/database/scopes/${scopeRef}/members`, asRootAdmin(), { personRef })
}

// Seed a committed shared version directly on a scope via SQL — a shortcut
// for "this document already exists at that level", bypassing the write path.
async function seedSharedDoc(ctx, scopeId, path, data, author = "seed") {
  const max = await ctx.pool.query(
    `SELECT COALESCE(MAX(version),0) AS m FROM "${ctx.schema}".versions
      WHERE scope_id = $1 AND doc_path = $2`,
    [scopeId, path]
  )
  const version = max.rows[0].m + 1
  await ctx.pool.query(
    `INSERT INTO "${ctx.schema}".versions
       (scope_id, doc_path, version, status, is_deletion, data, meta, author)
     VALUES ($1, $2, $3, 'committed', false, $4::jsonb, '{}'::jsonb, $5)`,
    [scopeId, path, version, JSON.stringify(data), author]
  )
  return version
}

// Look up a scope id by its full human path (e.g. "electra/apps/brains").
// Uses direct SQL — the by-path API endpoint has been removed.
async function scopeIdByPath(pool, schema, pathString) {
  const parts = pathString.split("/").filter(Boolean)
  let parentId = null
  for (const p of parts) {
    const res = parentId === null
      ? await pool.query(
          `SELECT id FROM "${schema}".scopes WHERE parent_id IS NULL AND name = $1`, [p])
      : await pool.query(
          `SELECT id FROM "${schema}".scopes WHERE parent_id = $1 AND name = $2`,
          [parentId, p])
    if (res.rowCount === 0) return null
    parentId = res.rows[0].id
  }
  return parentId
}

// Common setup used by content-oriented tests: creates a klasse-scope under
// apps/brains and adds the given member(s). Returns useful ids.
async function makeKlasseScope(ctx, extraMembers = ["anna"], opts = {}) {
  const brainsId = await scopeIdByPath(ctx.pool, ctx.schema, "electra/apps/brains")
  const klasseId = await createScope(ctx, brainsId, "klasse8a", opts)
  for (const m of extraMembers) {
    await addMember(ctx, klasseId, m)
  }
  return { brainsId, klasseId }
}

module.exports = {
  setupTestSchema,
  newTestSchema,
  dropSchema,
  asPerson,
  asRootAdmin,
  asAnon,
  get,
  put,
  post,
  patch,
  del,
  docsUrl,
  readDoc,
  writeDoc,
  createScope,
  addMember,
  seedSharedDoc,
  scopeIdByPath,
  makeKlasseScope,
  ROOT_ADMIN_HASH,
  TEST_ROOT_ADMIN_EMAIL,
}
