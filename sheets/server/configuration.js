const die = require("./utils/die")

// sheets talks directly to the `database` service. No filesystem storage:
// the generic Finder API in files.js maps to the DB scope model via db.js.
// PDF export (handler/pdf.js) still renders via puppeteer against the ingress.
const host = process.env.LOCALHOST || die("Environment Variable LOCALHOST missing")
const port = process.env.PORT_DATABASE || die("Environment Variable PORT_DATABASE missing")

module.exports = {
  database: `http://${host}:${port}`,
  // Shared content scope — all app backends point here; the .sheet suffix filter
  // (in files.js) is what makes this the "sheets" view.
  appScopePath: process.env.SCOPE_CONTENT || "electra/content/apps",
  fileSuffix: ".sheet",
}
