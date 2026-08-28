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

const branches = require("./render/branches")
const { getIndexes, getSheet, getPartMarkdown, pathToSlug } = require("./render/list")
const { renderTree } = require("./render/tree")
const { renderPage, SITE } = require("./render/page")
const { rootView, branchView, folderView, sheetView, partView } = require("./render/views")

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
// kept verbatim and url-encoded. Every path carries its branch.
function encodeSegments(p) {
  return p.split("/").map(encodeURIComponent).join("/")
}
function branchPath(branch) { return `/gallery/${branch.slug}/` }
function folderPath(branch, slug) { return `/gallery/${branch.slug}/${encodeSegments(slug)}/` }
function docPath(branch, slug) { return `/gallery/${branch.slug}/${encodeSegments(slug)}` }

function isFolder(branch, items, slug) {
  const prefix = slug + "/"
  return items.some((it) => pathToSlug(branch, it.path).startsWith(prefix))
}

// The folder a document lives in - the tree's active branch.
function parentOf(slug) {
  return slug.includes("/") ? slug.slice(0, slug.lastIndexOf("/")) : ""
}

// Every folder implied by a set of document slugs.
function foldersOf(slugs) {
  const folders = new Set()
  slugs.forEach((slug) => {
    const parts = slug.split("/")
    let acc = ""
    for (let i = 0; i < parts.length - 1; i++) {
      acc = acc ? `${acc}/${parts[i]}` : parts[i]
      folders.add(acc)
    }
  })
  return folders
}

// --- sitemap ----------------------------------------------------------------
// Every branch, folder and document URL across both branches, so a crawler
// reaches all of them from one file. The tree in each page already links the
// folders, but the sitemap is explicit and lists the documents too.
app.get('/gallery/sitemap.xml', async (req, res) => {
  try {
    const indexes = await getIndexes(branches.ALL)
    const urls = new Set([SITE + "/gallery/"])
    indexes.forEach(({ branch, items }) => {
      urls.add(SITE + branchPath(branch))
      const slugs = items.map((it) => pathToSlug(branch, it.path))
      slugs.forEach((slug) => urls.add(SITE + docPath(branch, slug)))
      foldersOf(slugs).forEach((f) => urls.add(SITE + folderPath(branch, f)))
    })
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

// --- SSR --------------------------------------------------------------------
// Runs before express.static so the shell is filled per request and no stale
// index.html is ever served. Anything that resolves to neither a branch, a
// folder nor a document falls through to the static handler (bundle, images).
app.get(/^\/gallery(\/.*)?$/, async (req, res, next) => {
  try {
    const sub = req.path.slice("/gallery".length)
    if (sub === "") return res.redirect(301, "/gallery/")

    const indexes = await getIndexes(branches.ALL)
    const tree = (branch, currentPath) => renderTree(indexes, { branch, currentPath })

    // The gallery root: both branches side by side.
    if (sub === "/") {
      return res.send(renderPage({
        title: "Galerie - Electra.Academy",
        description: "Fertige Arbeitsblätter zur Digitaltechnik und alle Bauteile des Simulators - anschauen, laden oder weiterbauen. Kostenlos, ohne Anmeldung.",
        canonicalPath: "/gallery/",
        tree: tree(null, null),
        content: rootView(indexes),
      }))
    }

    const hasTrailing = sub.endsWith("/")
    const segments = sub.replace(/^\//, "").replace(/\/$/, "").split("/").map(decodeURIComponent)
    const branch = branches.by(segments[0])

    // Not one of the two branches: nothing here answers it.
    if (!branch) return next()

    const index = indexes.find((i) => i.branch.slug === branch.slug)
    const slug = segments.slice(1).join("/")

    // The branch entry page.
    if (!slug) {
      if (!hasTrailing) return res.redirect(301, branchPath(branch))
      return res.send(renderPage({
        title: `${branch.label} - Electra.Academy`,
        description: branchDescription(branch),
        canonicalPath: branchPath(branch),
        tree: tree(branch, null),
        content: branchView(branch, index.items),
      }))
    }

    const doc = index.bySlug.get(slug)
    const folder = isFolder(branch, index.items, slug)
    const name = slug.split("/").pop()

    if (hasTrailing) {
      if (folder) {
        return res.send(renderPage({
          title: `${name} - Electra.Academy`,
          description: `${name} - ${branchDescription(branch)}`,
          canonicalPath: folderPath(branch, slug),
          tree: tree(branch, slug),
          content: folderView(branch, index.items, slug),
        }))
      }
      if (doc) return res.redirect(301, docPath(branch, slug)) // documents drop the slash
      return next()
    }

    if (doc) {
      return res.send(renderPage({
        title: `${name} - Electra.Academy`,
        description: docDescription(branch, name),
        canonicalPath: docPath(branch, slug),
        tree: tree(branch, parentOf(slug)),
        content: branch === branches.PARTS
          ? partView(branch, doc, await getPartMarkdown(doc.uuid))
          : sheetView(branch, doc, await getSheet(doc.id)),
      }))
    }
    if (folder) return res.redirect(301, folderPath(branch, slug)) // folders gain the slash
    return next()
  } catch (err) {
    console.log(`[gallery] render failed for ${req.path}: ${err && err.message}`)
    return next(err)
  }
})

function branchDescription(branch) {
  return branch === branches.PARTS
    ? "Alle Bauteile des Simulators mit Schaltsymbol und Beschreibung."
    : "Fertige Arbeitsblätter zur Digitaltechnik zum Ansehen, als PDF oder im Autor öffnen."
}

function docDescription(branch, name) {
  return branch === branches.PARTS
    ? `${name} - Schaltsymbol und Beschreibung des Bauteils, direkt im Designer zu öffnen.`
    : `${name} - Arbeitsblatt zur Digitaltechnik zum Ansehen, als PDF oder im Autor öffnen.`
}

// Static assets (the client bundle, images). The ingress re-prepends the mount
// prefix before forwarding, so the service sees /gallery/... and mounts there.
app.use('/gallery', express.static(scriptPath+'/../public'));

// Start Server
// "localhost" => Service ist nicht von ausserhalb aufrufbar.
app.listen(PORT, LOCALHOST, () => {
    console.log(`Starting /gallery at http://${LOCALHOST}:${PORT}`);
});
