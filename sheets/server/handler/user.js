const shortid = require('short-uuid')
const path = require('path')

const filesystem = require("../utils/file")
const conf = require("../configuration")

const {nocache, ensureLoggedIn} = require("./middleware")

module.exports = {
    init: function (app) {
        // TODO: migrate to REST service API
        app.get('/sheets/user/list', nocache, ensureLoggedIn, (req, res) => {
            filesystem.listFiles(conf.absoluteUserDataDirectory(req), req.query.path, res)
                .catch(exception => {
                    console.log(exception)
                })
        })

        app.get('/sheets/user/get', nocache, ensureLoggedIn, (req, res) => {
            filesystem.getJSONFile(conf.absoluteUserDataDirectory(req), req.query.filePath, res)
                .catch(exception => {
                    console.log(exception)
                })
        })

        app.get('/sheets/user/image', nocache, ensureLoggedIn, (req, res) => {
            filesystem.getBinaryFile(conf.absoluteUserDataDirectory(req), req.query.filePath, res)
                .catch(error => {
                    console.log(error)
                })
        })

        app.post('/sheets/user/delete', ensureLoggedIn, (req, res) => {
            let fileRelativePath = req.body.filePath
            filesystem.delete(conf.absoluteUserDataDirectory(req), fileRelativePath)
                .then(() => {
                    res.send("ok")
                })
                .catch((error) => {
                    console.log(error)
                    res.status(403).send("error")
                })
        })

        app.post('/sheets/user/share', nocache, ensureLoggedIn, (req, res) => {
            let sha = shortid.generate()
            filesystem.copy( conf.absoluteUserDataDirectory(req),req.body.filePath, 
                             conf.absoluteSharedDataDirectory(), sha)
            .then( () => {
                res.status(200).send({ filePath: sha})
            })
            .catch(exception => {
                res.status(403).send("error")
                console.log(exception)
            })
        })

        app.post('/sheets/user/rename', ensureLoggedIn, (req, res) => {
            filesystem.rename(conf.absoluteUserDataDirectory(req), req.body.from, req.body.to, res)
                .catch(reason => {
                    console.log(reason)
                })
        })

        app.post('/sheets/user/folder', ensureLoggedIn, (req, res) => {
            filesystem.createFolder(conf.absoluteUserDataDirectory(req), req.body.filePath, res)
                .then((directoryRelativePath) => {
                    let fileRelativePath =  path.join(directoryRelativePath, "placeholder.txt")
                    let content =  "-placeholder for empty directories-"
                    // create file into empty directory. Otherwise the directory is not stored in github.
                    // (github prunes empty directories)
                    filesystem.writeFile(conf.absoluteUserDataDirectory(req), fileRelativePath, content)
                })
                .catch(error => {
                    console.log(error)
                })
        })

        app.post('/sheets/user/save', ensureLoggedIn, (req, res) => {
            let shapeRelativePath = req.body.filePath
            let content = req.body.content
            filesystem.writeFile(conf.absoluteUserDataDirectory(req), shapeRelativePath, content, res)
            .catch(reason => {
                console.log(reason)
            })
        })
    }
}
