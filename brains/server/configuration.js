const die = require("./utils/die")

// brains talks directly to the `database` service. No persistence abstraction:
// the generic Finder API in files.js maps to the DB scope model via db.js.
const host = process.env.LOCALHOST || die("Environment Variable LOCALHOST missing")
const port = process.env.PORT_DATABASE || die("Environment Variable PORT_DATABASE missing")

module.exports = {
  database: `http://${host}:${port}`,
  appScopePath: process.env.SCOPE_BRAINS || "electra/apps/brains",
}
