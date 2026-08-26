const die = require("./utils/die")

// sheets talks directly to the `database` service. No filesystem storage:
// the generic Finder API in files.js maps to the DB scope model via db.js.
// PDF export (handler/pdf.js) still renders via puppeteer against the ingress.
const host = process.env.LOCALHOST || die("Environment Variable LOCALHOST missing")
const port = process.env.PORT_DATABASE || die("Environment Variable PORT_DATABASE missing")

module.exports = {
  database: `http://${host}:${port}`,
  // Derived from SCOPE_PREFIX: the shared content root for sheets documents.
  appScopePath: `${process.env.SCOPE_PREFIX || "electra/content"}/apps`,
  fileSuffix: ".sheet",
  // The backup file format. All three are part of the format itself: changing
  // one makes every backup handed out so far unreadable. backupDocsKey is the
  // attribute this app's documents are listed under inside a package -
  // { "sheets": [ ... ], "brains": [ ... ] }.
  backupFormat: "electra-backup",
  backupFormatVersion: 1,
  backupDocsKey: "sheets",
}
