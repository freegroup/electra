const die = require("./utils/die")

// brains talks directly to the `database` service. No persistence abstraction:
// the generic Finder API in files.js maps to the DB scope model via db.js.
const host = process.env.LOCALHOST || die("Environment Variable LOCALHOST missing")
const port = process.env.PORT_DATABASE || die("Environment Variable PORT_DATABASE missing")

module.exports = {
  database: `http://${host}:${port}`,
  // Shared content scope — all app backends point here; the .brain suffix filter
  // (in files.js) is what makes this the "brains" view.
  appScopePath: process.env.SCOPE_CONTENT || "electra/content/apps",
  fileSuffix: ".brain",
}
