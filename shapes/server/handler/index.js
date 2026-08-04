const express = require('express')
const fs = require('fs-extra')
const path = require('path')
const {createHash } =  require('crypto')
  
const multistream = require('../utils/multistream')
const conf = require("../configuration")
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

        // TODO: migrate to REST service API
        app.get('/shapes/index.js', nocache, userHash, async (req, res) => {
            // the multistream do not set the correct mime type of the response....fix this.
            //
            res.setHeader('content-type', 'text/javascript')

            if (req.query.doc || req.query.scope) {
                try {
                    const { js } = await fromDatabase(req)
                    return res.send(js)
                } catch (err) {
                    return res.status(err.statusCode || 500).send(`/* ${err.message} */`)
                }
            }

            // create a array of file which can be concatenated and stream in a single response
            //
            let streams = [
                fs.createReadStream(path.join(conf.absoluteGlobalDataDirectory(), '/index.js')),
            ]

            // append the user spezific file if a user is logged in and the file exists
            //
            if (req.get("x-hash")){
                let userIndex = path.join(conf.absoluteUserDataDirectory(req), '/index.js')
                if(fs.existsSync(userIndex)) {
                    streams.push(fs.createReadStream(userIndex))
                }
            }
            // stream all files
            //
            new multistream(streams).pipe(res)
        }),

        app.get('/shapes/index.json', nocache, userHash, async (req, res) => {
            // the multistream do not set the correct mime type of the response....fix this.
            //
            res.setHeader('content-type', 'application/json')

            if (req.query.doc || req.query.scope) {
                try {
                    const { catalog } = await fromDatabase(req)
                    return res.status(200).send(catalog)
                } catch (err) {
                    return res.status(err.statusCode || 500).json({ error: { message: err.message } })
                }
            }
 
            // All JSON Files which can be concatenated and returned in a single JSON-Array
            //
            let readFiles =  [
                fs.readFile(path.join(conf.absoluteGlobalDataDirectory(), '/index.json'), "utf-8"),
            ]
            // append the user spezific file if a user is logged in and the file exists
            //
            if (req.get("x-hash")){
                let userIndex = path.join(conf.absoluteUserDataDirectory(req), '/index.json')
                if(fs.existsSync(userIndex)) {
                    readFiles.push(fs.readFile(userIndex, "utf-8"))
                }
            }
            // Read all of them and merge them into a single file
            //
            return Promise.all(readFiles)
            .then( strings =>{
                return strings.map( x => JSON.parse(x))
            })
            .then( (json) => {
                // Merge by name, LAST one wins. The files arrive in walk-up order
                // (global first, the caller's own last), so an override has to beat
                // what it overrides — whoever is closer to the user decides.
                //
                // This is the direction index.js has had all along: its files are
                // concatenated, so a later `var X = …` replaces the earlier one.
                // The catalogue used to do the opposite and keep the FIRST entry,
                // which meant a user could override a shape's code but not its
                // catalogue entry. Masked so far only because user shapes tend to
                // carry unique names.
                //
                // Map.set keeps the position of the first occurrence and replaces
                // its value, so an override does not reorder the palette.
                function mergeByName(entries) {
                    let byName = new Map()
                    for (let entry of entries) {
                        byName.set(entry.name, entry)
                    }
                    return [...byName.values()]
                }
                return mergeByName(json.flat());
            })
            .then( (json => {
                res.status(200).send(json)
            })) 
        })
    }
}
