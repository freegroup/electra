const {createHash } =  require('crypto')

const db = require("../db")
const indexBuilder = require("../indexBuilder")

function nocache(req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
}


function userHash  (req, res, next) {
    let mail = req.get("x-mail")
    if (mail) {
        let hash = createHash('sha256')
        hash.update(mail)
        req.headers["x-hash"]=hash.digest('hex')
    }
    next()
}

module.exports = {
    init: function (app) {

        // Both artefacts are served two ways while the migration runs:
        //
        //   ?doc=<handle>   the components resolved for THAT document's
        //                   workspace, built from the database (the target)
        //   ?doc=new        a document that does not exist yet — the scope the
        //                   caller works in, not whatever was open before
        //   ?scope=<ref>    a chosen workspace, before the first save. Scopes are
        //                   client-visible by ref (the workspace list, distribute
        //                   targets), unlike document handles, so this is fine.
        //   no parameter    the old directory concatenation (the fallback)
        //
        // Without a context there is nothing to resolve against, so a caller
        // that has not moved yet keeps the behaviour it had. Both are produced
        // by ONE pass in indexBuilder, so catalogue and code cannot disagree.
        async function fromDatabase(req) {
            const auth = db.pickAuthHeaders(req)
            let scopeRef
            if (req.query.scope) {
                scopeRef = String(req.query.scope)
            } else {
                const handle = req.query.doc
                scopeRef = handle === "new" ? null : db.decodeId(handle).scopeRef
            }
            const docs = await db.resolveComponents(scopeRef, auth)
            return indexBuilder.build(docs.map((d) => ({
                docPath: d.path,
                data: d.data,
                uuid: d.uuid,
                scope: d.scope,
            })))
        }

        // The preview of one component, addressed by the uuid its catalogue entry
        // carries. Which image belongs to a component is the same resolution as
        // which code does — a path cannot answer it once several workspaces are
        // in play, so the answer is fixed when the index is built and everything
        // after that hangs off the version.
        //
        // A version never changes, hence the immutable cache; without clearing
        // Pragma/Expires the nocache middleware above would defeat it again.
        app.get('/shapes/thumb', userHash, async (req, res) => {
            try {
                const dbRes = await db.raw(
                    `/database/docs/${encodeURIComponent(req.query.uuid)}/blobs/preview`,
                    db.pickAuthHeaders(req)
                )
                const ct = dbRes.headers.get("content-type")
                if (ct) res.set("content-type", ct)
                res.set("cache-control", "private, max-age=31536000, immutable")
                res.removeHeader("Pragma")
                res.removeHeader("Expires")
                res.send(Buffer.from(await dbRes.arrayBuffer()))
            } catch (err) {
                res.status(err.statusCode || 404).end()
            }
        })

        // One text member of a component, addressed by the same version uuid its
        // catalogue entry carries. The sibling of /shapes/thumb: thumb serves the
        // preview blob, this serves the text fields (shape, custom, js, md) that
        // live in the version's `data`. The description dialog reads `.../md`.
        // A version never changes, so the immutable cache applies as it does for
        // the preview.
        const TEXT_MEMBERS = new Set(["shape", "custom", "js", "md"])
        app.get('/shapes/part/:uuid/:member', userHash, async (req, res) => {
            const { uuid, member } = req.params
            if (!TEXT_MEMBERS.has(member)) return res.status(404).end()
            try {
                const doc = await db.call("GET", `/database/docs/${encodeURIComponent(uuid)}`, {
                    authHeaders: db.pickAuthHeaders(req),
                })
                const value = doc && doc.data ? doc.data[member] : undefined
                if (value == null) return res.status(404).end()
                res.set("content-type", member === "md" ? "text/markdown; charset=utf-8" : "text/plain; charset=utf-8")
                res.set("cache-control", "private, max-age=31536000, immutable")
                res.removeHeader("Pragma")
                res.removeHeader("Expires")
                res.send(String(value))
            } catch (err) {
                res.status(err.statusCode || 404).end()
            }
        })

        // The component code for a context, built from the database. A context is
        // mandatory (?doc=<handle>, ?doc=new, or ?scope=<ref>): which components
        // apply depends on the workspace, so there is nothing to serve without it.
        app.get('/shapes/index.js', nocache, userHash, async (req, res) => {
            res.setHeader('content-type', 'text/javascript')
            if (!req.query.doc && !req.query.scope) {
                return res.status(400).send(`/* missing ?doc or ?scope */`)
            }
            try {
                const { js } = await fromDatabase(req)
                return res.send(js)
            } catch (err) {
                return res.status(err.statusCode || 500).send(`/* ${err.message} */`)
            }
        })

        // The palette catalogue for the same context, from the same single pass,
        // so code and catalogue cannot disagree.
        app.get('/shapes/index.json', nocache, userHash, async (req, res) => {
            res.setHeader('content-type', 'application/json')
            if (!req.query.doc && !req.query.scope) {
                return res.status(400).json({ error: { message: "missing ?doc or ?scope" } })
            }
            try {
                const { catalog } = await fromDatabase(req)
                return res.status(200).send(catalog)
            } catch (err) {
                return res.status(err.statusCode || 500).json({ error: { message: err.message } })
            }
        })
    }
}
