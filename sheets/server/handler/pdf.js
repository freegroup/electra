const path = require("path")
const PDFDocument = require('pdf-lib').PDFDocument
const die = require("../utils/die")
const db = require("../db")
const PORT_INGRESS = process.env.PORT_INGRESS || die("missing env variable PORT_INGRESS");
const AUTHOR_URL =  `http://localhost:${PORT_INGRESS}/author`

function nocache(req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
}

module.exports = {
    init: function (app) {

        // PDF export. The document is named by the opaque handle (?id=). We
        // publish it (idempotent — returns its publicId) and render the public
        // read page, so the headless browser needs no login. mode: worksheet |
        // solution | all (worksheet+solution merged).
        app.get('/sheets/pdf', nocache, async (req, res) => {
            try {
                const auth = db.pickAuthHeaders(req)
                const { scopeRef, path: docPath } = db.decodeId(req.query.id)
                let mode = req.query.mode ?? "worksheet"

                // Mint a short-lived render token (login-free read of this exact
                // version) — no publishing needed, so unpublished docs export too.
                const { token } = await db.call(
                    "POST",
                    `/database/scopes/${scopeRef}/docs/render-token`,
                    { authHeaders: auth, body: { path: docPath } }
                )
                const footer = path.basename(docPath)

                const { render } = require("../converter/pdf")
                const pageUrl = (m) => `${AUTHOR_URL}/page.html?rtoken=${encodeURIComponent(token)}&mode=${m}`

                let all = false
                let header = mode === "solution" ? "Solution Pages" : ""
                if (mode === "all") {
                    mode = "worksheet"
                    all = true
                    header = "Worksheet Pages"
                }

                let pdf = await render(pageUrl(mode), header, footer)
                if (all) {
                    const pdf2 = await render(pageUrl("solution"), "Solution Pages", footer)
                    const mergedPdf = await PDFDocument.create()
                    for (const bytes of [pdf, pdf2]) {
                        const src = await PDFDocument.load(bytes)
                        const copied = await mergedPdf.copyPages(src, src.getPageIndices())
                        copied.forEach((page) => mergedPdf.addPage(page))
                    }
                    pdf = Buffer.from(await mergedPdf.save())
                }

                res.set({ 'Content-Type': 'application/pdf', 'Content-Length': pdf.length })
                res.send(pdf)
            } catch (err) {
                const code = err && err.statusCode ? err.statusCode : 500
                console.log(`[sheets/pdf] ${code}: ${err && err.message}`)
                res.status(code).json({ error: { message: err && err.message } })
            }
        })
    }
}
