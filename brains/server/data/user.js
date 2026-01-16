const shortid = require('short-uuid')
const path = require('path')

const conf = require("../configuration")
const persistence = conf.persistence
const {nocache, ensureLoggedIn} = require("./middleware")

function handleError(res, err, message) {
    console.log(err)
    let status = err.statusCode || 500
    res.status(status).send(message)
}

module.exports = {
    init: function (app) {
        // TODO: migrate to REST service API
        app.get('/brains/user/list', nocache, ensureLoggedIn, (req, res) => {
            persistence.listFiles("user:"+req.get("x-hash"), req.query.path)
                .then(stream => {
                    res.setHeader('Content-Type', 'application/json')
                    stream.pipe(res)
                })
                .catch(err => handleError(res, err, "Unable to list files"))
        })

        app.get('/brains/user/get', nocache, ensureLoggedIn, (req, res) => {
            persistence.getJSONFile("user:"+req.get("x-hash"), req.query.filePath)
                .then(stream => {
                    res.setHeader('Content-Type', 'application/json')
                    stream.pipe(res)
                })
                .catch(err => handleError(res, err, "Unable to read file"))
        })

        app.post('/brains/user/share', nocache, ensureLoggedIn, (req, res) => {
            let sha = shortid.generate()
            persistence.copy( "user:"+req.get("x-hash"),req.body.filePath, "shared", sha)
            .then( stream => {
                stream.pipe(res)
            })
            .catch(err => handleError(res, err, "Unable to share file"))
        })

        app.get('/brains/user/image', nocache, ensureLoggedIn, (req, res) => {
            persistence.getBinaryFile("user:"+req.get("x-hash"), req.query.filePath)
                .then(stream => {
                    res.writeHead(200, {'Content-Type': 'image/png'})
                    stream.pipe(res)
                })
                .catch(err => handleError(res, err, "Unable to read image"))
        })

        app.post('/brains/user/delete', ensureLoggedIn, (req, res) => {
            let fileRelativePath = req.body.filePath
            persistence.delete("user:"+req.get("x-hash"), fileRelativePath)
                .then(() => {
                    persistence.delete("user:"+req.get("x-hash"), fileRelativePath.replace(".brain", ".guide"))
                        .catch(()=> {})

                    res.send("ok")
                })
                .catch(err => handleError(res, err, "Unable to delete file"))
        })

        app.post('/brains/user/rename', ensureLoggedIn, (req, res) => {
            persistence.rename("user:"+req.get("x-hash"), req.body.from, req.body.to)
                .then(stream => {
                    persistence.rename("user:"+req.get("x-hash"),
                        req.body.from.replace(".brain", ".guide"), 
                        req.body.to.replace(".brain", ".guide"))
                        .catch(()=> {})

                    stream.pipe(res)
                })
                .catch(err => handleError(res, err, "Unable to rename file"))
        })

        app.post('/brains/user/folder', ensureLoggedIn, (req, res) => {
            persistence.createFolder("user:"+req.get("x-hash"), req.body.filePath)
                .then((stream) => {
                    let fileRelativePath =  path.join(req.body.filePath, "placeholder.txt")
                    let content =  "-placeholder for empty directories-"
                    persistence.writeFile("user:"+req.get("x-hash"), fileRelativePath, content)
                        .catch(()=> {})
                        
                    stream.pipe(res)
                })
                .catch(err => handleError(res, err, "Unable to create folder"))
        })

        app.post('/brains/user/save', ensureLoggedIn, (req, res) => {
            let shapeRelativePath = req.body.filePath
            let content = req.body.content
            persistence.writeFile("user:"+req.get("x-hash"), shapeRelativePath, content)
                .then(stream => stream.pipe(res))
                .catch(err => handleError(res, err, "Unable to save file"))
        })
    }
}
