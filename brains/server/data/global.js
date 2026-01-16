const shortid = require('short-uuid')
const path = require('path')

const {nocache, ensureAdminLoggedIn, ensureLoggedIn} = require("./middleware")

const conf = require("../configuration")
const persistence = conf.persistence

function handleError(res, err, message) {
    console.log(err)
    let status = err.statusCode || 500
    res.status(status).send(message)
}

module.exports = {
    init: function (app) {
        // TODO: migrate to REST service API
        app.get('/brains/global/list', nocache, (req, res) => {
            persistence.listFiles("global", req.query.path)
                .then(stream => {
                    res.setHeader('Content-Type', 'application/json')
                    stream.pipe(res)
                })
                .catch(err => handleError(res, err, "Unable to list files"))
        })

        app.get('/brains/global/get', nocache, (req, res) => {
            persistence.getJSONFile("global", req.query.filePath)
                .then(stream => {
                    res.setHeader('Content-Type', 'application/json')
                    stream.pipe(res)
                })
                .catch(err => handleError(res, err, "Unable to read file"))
        })


        app.post('/brains/global/share', ensureLoggedIn, (req, res) => {
            let sha =shortid.generate()
            persistence.copy("global",req.body.filePath, "shared", sha)
            .then( stream => {
                stream.pipe(res)
            })
            .catch(exception => {
                console.log(exception)
                res.status(403).send("error")
            })
        })

        app.get('/brains/global/image', nocache, (req, res) => {
            persistence.getBinaryFile("global", req.query.filePath)
                .then(stream => {
                    res.writeHead(200, {'Content-Type': 'image/png'})
                    stream.pipe(res)
                })
                .catch(error => handleError(res, error, "Unable to read image"))
        })


        app.post('/brains/global/delete', ensureAdminLoggedIn, (req, res) => {
            let fileRelativePath = req.body.filePath
            persistence.delete("global", fileRelativePath)
                .then(() => {
                     persistence.delete("global", fileRelativePath.replace(".brain", ".guide"))
                        .catch(()=> {}) // ignore
                     res.send("ok")
                })
                .catch(err => handleError(res, err, "Unable to delete file"))
        })

        app.post('/brains/global/rename', ensureAdminLoggedIn, (req, res) => {
            persistence.rename("global", req.body.from, req.body.to)
                .then(stream => {
                    // Side effect: rename .guide
                    persistence.rename("global", 
                        req.body.from.replace(".brain", ".guide"), 
                        req.body.to.replace(".brain", ".guide"))
                        .catch(()=> {}) // ignore
                    
                    stream.pipe(res)
                })
                .catch(reason => handleError(res, reason, "Unable to rename file"))
        })

        app.post('/brains/global/folder', ensureAdminLoggedIn, (req, res) => {
            persistence.createFolder("global", req.body.filePath)
                .then((stream) => {
                    // Side effect: create placeholder
                    // We need the resolved directory path to create the placeholder.
                    // req.body.filePath is the subDir.
                    let fileRelativePath =  path.join(req.body.filePath, "placeholder.txt")
                    let content =  "-placeholder for empty directories-"
                    persistence.writeFile("global", fileRelativePath, content)
                        .catch(()=> {})

                    stream.pipe(res)
                })
                .catch(error => handleError(res, error, "Unable to create folder"))
        })

        app.post('/brains/global/save', ensureAdminLoggedIn, (req, res) => {
            let shapeRelativePath = req.body.filePath
            let content = req.body.content
            persistence.writeFile("global", shapeRelativePath, content)
                .then(stream => stream.pipe(res))
                .catch(reason => handleError(res, reason, "Unable to save file"))
        })
    }
}
