// Forward-only migration runner.
// Applies migrations/*.sql files whose name is not yet in <schema>.migrations.
// Invoked automatically at service boot from server/index.js and can also be
// run standalone via `npm run migrate`.

const fs = require("fs")
const path = require("path")
const { pool, schema } = require("./pool")

const MIGRATIONS_DIR = path.join(__dirname, "migrations")

async function ensureSchema() {
  // Extensions are database-wide, not schema-scoped. If a parallel migration
  // runs (e.g. multiple test files), only one attempt should create them.
  // An advisory lock serializes contenders. The key is an arbitrary constant.
  const ADVISORY_LOCK_KEY = 60013737     // arbitrary constant identifying our migrator
  const client = await pool.connect()
  try {
    await client.query("SELECT pg_advisory_lock($1)", [ADVISORY_LOCK_KEY])
    await client.query(`CREATE EXTENSION IF NOT EXISTS pgcrypto`)
    await client.query(`CREATE SCHEMA IF NOT EXISTS "${schema}"`)
    await client.query(`
      CREATE TABLE IF NOT EXISTS "${schema}".migrations (
        name text PRIMARY KEY,
        applied_at timestamptz NOT NULL DEFAULT now()
      )
    `)
    await client.query("SELECT pg_advisory_unlock($1)", [ADVISORY_LOCK_KEY])
  } finally {
    client.release()
  }
}

async function alreadyApplied() {
  const res = await pool.query(`SELECT name FROM "${schema}".migrations ORDER BY name`)
  return new Set(res.rows.map((r) => r.name))
}

function readMigrationFiles() {
  if (!fs.existsSync(MIGRATIONS_DIR)) return []
  return fs
    .readdirSync(MIGRATIONS_DIR)
    .filter((f) => f.endsWith(".sql"))
    .sort()
}

async function runOne(name) {
  const fullPath = path.join(MIGRATIONS_DIR, name)
  const sql = fs.readFileSync(fullPath, "utf8")
  const client = await pool.connect()
  try {
    await client.query("BEGIN")
    await client.query(`SET search_path TO "${schema}", public`)
    await client.query(sql)
    await client.query(`INSERT INTO "${schema}".migrations (name) VALUES ($1)`, [name])
    await client.query("COMMIT")
    console.log(`[database] migration applied: ${name}`)
  } catch (err) {
    await client.query("ROLLBACK")
    throw err
  } finally {
    client.release()
  }
}

async function migrate() {
  await ensureSchema()
  const applied = await alreadyApplied()
  const files = readMigrationFiles()
  for (const name of files) {
    if (!applied.has(name)) await runOne(name)
  }
}

module.exports = { migrate }

// Support `node persistence/migrate.js` standalone.
if (require.main === module) {
  migrate()
    .then(() => {
      console.log("[database] migrations up to date")
      process.exit(0)
    })
    .catch((err) => {
      console.error("[database] migration failed:", err)
      process.exit(1)
    })
}
