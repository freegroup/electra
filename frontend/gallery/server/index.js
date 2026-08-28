const express = require('express');
const path = require("path")
const dotenv = require('dotenv')

const PROJECT_PATH = path.resolve(__dirname+ "/../../..")
const componentPath = path.resolve(__dirname+ "/..")
const componentName = path.basename(componentPath)
const scriptPath = path.dirname(__filename);
const envFile = PROJECT_PATH+'/settings.ini'

console.log(`Component '${componentName} is loading envFile '${envFile}'`)
dotenv.config({ debug: false,path: envFile })

const { getIndex, getDoc, pathToSlug } = require("./render/list")
const { renderTree } = require("./render/tree")
const { renderPage, SITE } = require("./render/page")
const { rootView, folderView, docView } = require("./render/views")

function die(msg){
    console.log(msg)
    process.exit(1)
}

const PORT = process.env.PORT_GALLERY || die("missing env variable PORT_GALLERY");
const LOCALHOST = process.env.LOCALHOST || die("missing env variable LOCALHOST");

// Create Express Server
const app = express();

// --- URL helpers ------------------------------------------------------------
// Folders are canonical WITH a trailing slash, documents WITHOUT. Segments are
// kept verbatim and url-encoded.
function encodeSegments(p) {
  return p.split("/").map(encodeURIComponent).join("/")
}
function folderPath(slug) { return `/gallery/${encodeSegments(slug)}/` }
function docPath(slug) { return `/gallery/${encodeSegments(slug)}` }

function isFolder(items, slug) {
  const prefix = slug + "/"
  return items.some((it) => pathToSlug(it.path).startsWith(prefix))
}

// The folder a document (or folder) lives in - the tree's active branch.
function parentOf(slug) {
  return slug.includes("/") ? slug.slice(0, slug.lastIndexOf("/")) : ""
}

// --- sitemap ----------------------------------------------------------------
// Every folder and worksheet URL, so a crawler reaches all of them from one
// file. The tree in each page already links them, but the sitemap is explicit.
app.get('/gallery/sitemap.xml', async (req, res) => {
  try {
    const { items } = await getIndex()
    const urls = new Set([SITE + "/gallery/"])
    const folders = new Set()
    items.forEach((it) => {
      const slug = pathToSlug(it.path)
      const parts = slug.split("/")
      let acc = ""
      for (let i = 0; i < parts.length - 1; i++) {
        acc = acc ? `${acc}/${parts[i]}` : parts[i]
        folders.add(acc)
      }
      urls.add(SITE + docPath(slug))
    })
    folders.forEach((f) => urls.add(SITE + folderPath(f)))
    const body = Array.from(urls)
      .map((u) => `  <url><loc>${u.replace(/&/g, "&amp;")}</loc></url>`)
      .join("\n")
    res.set("content-type", "application/xml")
    res.send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`)
  } catch (err) {
    console.log(`[gallery] sitemap failed: ${err && err.message}`)
    res.status(500).end()
  }
})

// --- SSR: root, folders, worksheets -----------------------------------------
// Runs before express.static so the shell is filled per request and no stale
// index.html is ever served. Anything that is neither a folder nor a document
// falls through to the static handler (bundle, images, ...).
app.get(/^\/gallery(\/.*)?$/, async (req, res, next) => {
  try {
    const sub = req.path.slice("/gallery".length)
    if (sub === "") return res.redirect(301, "/gallery/")

    const { items, bySlug } = await getIndex()
    const tree = (currentPath) => renderTree(items, { currentPath })

    if (sub === "/") {
      return res.send(renderPage({
        title: "Arbeitsblätter - Electra.Academy",
        description: "Fertige Arbeitsblätter zur Digitaltechnik: anschauen, als PDF laden oder im Autor öffnen. Kostenlos, ohne Anmeldung.",
        canonicalPath: "/gallery/",
        tree: tree(null),
        content: rootView(items),
      }))
    }

    const hasTrailing = sub.endsWith("/")
    const slug = sub.replace(/^\//, "").replace(/\/$/, "").split("/").map(decodeURIComponent).join("/")
    const doc = bySlug.get(slug)
    const folder = isFolder(items, slug)

    if (hasTrailing) {
      if (folder) {
        const name = slug.split("/").pop()
        return res.send(renderPage({
          title: `${name} - Electra.Academy`,
          description: `${name} - Arbeitsblätter zur Digitaltechnik.`,
          canonicalPath: folderPath(slug),
          tree: tree(slug),
          content: folderView(items, slug),
        }))
      }
      if (doc) return res.redirect(301, docPath(slug)) // documents drop the slash
      return next()
    }

    if (doc) {
      const name = slug.split("/").pop()
      const content = await getDoc(doc.id)
      return res.send(renderPage({
        title: `${name} - Electra.Academy`,
        description: `${name} - Arbeitsblatt zur Digitaltechnik zum Ansehen, als PDF oder im Autor öffnen.`,
        canonicalPath: docPath(slug),
        tree: tree(parentOf(slug)),
        content: docView(doc, content),
      }))
    }
    if (folder) return res.redirect(301, folderPath(slug)) // folders gain the slash
    return next()
  } catch (err) {
    console.log(`[gallery] render failed for ${req.path}: ${err && err.message}`)
    return next(err)
  }
})

// Static assets (the client bundle, images). The ingress re-prepends the mount
// prefix before forwarding, so the service sees /gallery/... and mounts there.
app.use('/gallery', express.static(scriptPath+'/../public'));

// Start Server
// "localhost" => Service ist nicht von ausserhalb aufrufbar.
app.listen(PORT, LOCALHOST, () => {
    console.log(`Starting /gallery at http://${LOCALHOST}:${PORT}`);
});
