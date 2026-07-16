const die = require("./die")

// userinfo talks to the internal `database` service for account-scoped features
// (workspaces, later starred/links). The database URL is localhost-only; the
// ingress never exposes /database directly.
const host = process.env.LOCALHOST || die("Environment Variable LOCALHOST missing")
const port = process.env.PORT_DATABASE || die("Environment Variable PORT_DATABASE missing")

module.exports = {
  database: `http://${host}:${port}`,
}
