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
                // The frontend passes the current UI language; whitelist to the
                // two we ship, default German (the audience). Only the PDF chrome
                // (header/footer labels) is localized - content stays as authored.
                const lang = req.query.lang === "en" ? "en" : "de"

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

                // A light green header marks the solution sheet at a glance, so
                // a printed stack does not get worksheet and solution confused.
                const SOLUTION_HEADER_BG = "#dff0d8"

                // Static labels and layout live in the per-language chrome
                // templates (header.<lang>.html). Only the center label depends on
                // the mode, so it is the one string resolved here.
                const MODE_LABEL = {
                    en: { worksheet: "Worksheet", solution: "Sample Solution" },
                    de: { worksheet: "Arbeitsblatt", solution: "Musterlösung" },
                }
                const modeLabel = MODE_LABEL[lang]

                let all = false
                let header = mode === "solution" ? modeLabel.solution : ""
                let headerBg = mode === "solution" ? SOLUTION_HEADER_BG : "white"
                if (mode === "all") {
                    mode = "worksheet"
                    all = true
                    header = modeLabel.worksheet
                    headerBg = "white"
                }

                let pdf = await render(pageUrl(mode), { lang, headerText: header, footerText: footer, headerBg })
                if (all) {
                    const pdf2 = await render(pageUrl("solution"), { lang, headerText: modeLabel.solution, footerText: footer, headerBg: SOLUTION_HEADER_BG })
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
