// First-boot bootstrap.
//
// Runs after migrations. Reads init.json (path overridable via
// DATABASE_INIT_FILE) and provisions the entire declared tree if — and
// only if — the DB has no root scope yet.
//
// If the root scope already exists, this module is a no-op. Runtime state
// (scopes, members, roles) is never modified by later boots.
//
// See README §3.4 and ARCHITECTURE.md §6.2.
//
// init.json shape:
//   {
//     "<rootScopeName>": {
//       "admins": ["email@...", ...],           // required on root, optional elsewhere
//       "requiredApprovalScore": 0,             // optional, default 0
//       "<subScopeName>": { ...same shape... },
//       "<anotherSubScope>": { ... }
//     }
//   }
//
// Reserved keys per scope: `admins`, `requiredApprovalScore`.
// Every other key describes a child scope with the property name as its
// scope name.

const fs = require("fs")
const path = require("path")
const { pool } = require("./pool")
const { getRoot, createRootScope, createScope } = require("./scopes")

const DEFAULT_INIT_FILE = path.join(__dirname, "..", "..", "init.json")

const RESERVED_KEYS = new Set(["admins", "requiredApprovalScore", "bootstrap"])

function readInitFile() {
  const filePath = process.env.DATABASE_INIT_FILE || DEFAULT_INIT_FILE
  let raw
  try {
    raw = fs.readFileSync(filePath, "utf8")
  } catch (err) {
    throw new Error(`unable to read init file at ${filePath}: ${err.message}`)
  }
  try {
    return { filePath, spec: JSON.parse(raw) }
  } catch (err) {
    throw new Error(`init file ${filePath} is not valid JSON: ${err.message}`)
  }
}

// Extracts the root scope name + root object from the top-level spec.
function extractRoot(spec, filePath) {
  if (!spec || typeof spec !== "object" || Array.isArray(spec)) {
    throw new Error(`${filePath}: top level must be a JSON object`)
  }
  const rootKeys = Object.keys(spec)
  if (rootKeys.length !== 1) {
    throw new Error(
      `${filePath}: top level must have exactly one key (the root scope name), got ${rootKeys.length}`
    )
  }
  const rootName = rootKeys[0]
  const rootNode = spec[rootName]
  if (!rootNode || typeof rootNode !== "object" || Array.isArray(rootNode)) {
    throw new Error(`${filePath}: root scope value must be an object`)
  }
  return { rootName, rootNode }
}

function admins(node) {
  const a = node.admins
  if (!Array.isArray(a)) return []
  return a.filter((e) => typeof e === "string" && e.length > 0)
}

function childEntries(node) {
  return Object.entries(node).filter(([key]) => !RESERVED_KEYS.has(key))
}

// Validates the root has at least one admin. Sub-scopes may have zero admins.
function validateRoot(rootName, rootNode, filePath) {
  const rootAdmins = admins(rootNode)
  if (rootAdmins.length === 0) {
    throw new Error(
      `${filePath}: root scope "${rootName}" must declare at least one admin email under "admins"`
    )
  }
}

// Inserts all admin members declared on a node. Runs inside its own tx.
async function applyAdmins(scopeId, node) {
  const emails = admins(node)
  if (emails.length === 0) return

  const client = await pool.connect()
  try {
    await client.query("BEGIN")
    for (const email of emails) {
      const personRef = email
      await client.query(
        `INSERT INTO memberships (scope_id, person_ref, is_member, is_admin, reviewer_score)
         VALUES ($1, $2, true, true, 10)
         ON CONFLICT (scope_id, person_ref)
         DO UPDATE SET is_member = true, is_admin = true, reviewer_score = 10`,
        [scopeId, personRef]
      )
    }
    await client.query("COMMIT")
  } catch (err) {
    await client.query("ROLLBACK")
    throw err
  } finally {
    client.release()
  }
}

// Recursively creates a scope and all its declared descendants.
async function createSubtree({ parentId, name, node, adminEmail }) {
  const required = node.requiredApprovalScore ?? 0
  const isBootstrap = node.bootstrap === true

  let scope
  if (parentId === null) {
    scope = await createRootScope({
      name,
      requiredApprovalScore: required,
      createdBy: adminEmail,
    })
    console.log(`[database] bootstrap: created root scope "${name}" (id=${scope.id})`)
  } else {
    scope = await createScope({
      parentId,
      name,
      requiredApprovalScore: required,
      isBootstrap,
      createdBy: adminEmail,
    })
    console.log(`[database] bootstrap: created scope "${name}" under parent ${parentId} (id=${scope.id})${isBootstrap ? " [bootstrap]" : ""}`)
  }

  await applyAdmins(scope.id, node)

  for (const [childName, childNode] of childEntries(node)) {
    if (!childNode || typeof childNode !== "object" || Array.isArray(childNode)) {
      throw new Error(`init.json: child "${childName}" must be an object`)
    }
    await createSubtree({ parentId: scope.id, name: childName, node: childNode, adminEmail })
  }

  return scope.id
}

async function bootstrap() {
  // No-op if the DB has already been bootstrapped once.
  const client = await pool.connect()
  let existingRoot
  try {
    existingRoot = await getRoot(client)
  } finally {
    client.release()
  }
  if (existingRoot) return

  const { filePath, spec } = readInitFile()
  const { rootName, rootNode } = extractRoot(spec, filePath)
  validateRoot(rootName, rootNode, filePath)

  // The first admin declared on the root becomes createdBy for every scope
  // in the tree. Sub-scopes without explicit admins inherit no rights —
  // that must be configured later via API.
  const rootAdminEmail = admins(rootNode)[0]
  const adminEmail = rootAdminEmail

  await createSubtree({ parentId: null, name: rootName, node: rootNode, adminEmail })
}

module.exports = { bootstrap }
