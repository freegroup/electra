const fs = require('fs-extra')
const path = require('path')

const filesystem = require("../utils/file")
const {nocache, ensureAdminLoggedIn, ensureLoggedIn} = require("./middleware")

const conf = require("../configuration")


module.exports = {
    init: function (app) {
        // TODO: migrate to REST service API
        app.get('/brains/global/list', nocache, (req, res) => {
            filesystem.listFiles(conf.absoluteGlobalDataDirectory(), req.query.path, res)
                .catch(exception => {
                    console.log(exception)
                })
        })

        app.get('/brains/global/get', nocache, (req, res) => {
            filesystem.getJSONFile(conf.absoluteGlobalDataDirectory(), req.query.filePath, res)
                .catch(exception => {
                    console.log(exception)
                })
        })


        app.post('/brains/global/share', ensureLoggedIn, (req, res) => {
            let sha = createHash('sha256')
            filesystem.copy( conf.absoluteGlobalDataDirectory(),req.body.filePath, 
                             conf.absoluteSharedDataDirectory(), sha)
            .then( () => {
                res.status(200).send({ filePath: sha})
            })
            .catch(exception => {
                res.status(403).send("error")
                console.log(exception)
            })
        })

        app.get('/brains/global/image', nocache, (req, res) => {
            filesystem.getBinaryFile(conf.absoluteGlobalDataDirectory(), req.query.filePath, res)
                .catch(error => {
                    console.log(error)
                })
        })


        app.post('/brains/global/delete', ensureAdminLoggedIn, (req, res) => {
            let fileRelativePath = req.body.filePath
            filesystem.delete(conf.absoluteGlobalDataDirectory(), fileRelativePath)
                .then((sanitizedRelativePaths) => {
                    filesystem.delete(conf.absoluteGlobalDataDirectory(), sanitizedRelativePaths.replace(".brain", ".guide"))
                    .catch (()=>{
                        // ignore "not found" error
                    })
                    .finally (()=> {
                        res.send("ok")
                    })
                })
                .catch(() => {
                    res.status(403).send("error")
                })
        })

        app.post('/brains/global/rename', ensureAdminLoggedIn, (req, res) => {
            filesystem.rename(conf.absoluteGlobalDataDirectory(), req.body.from, req.body.to, res)
                .then(({ fromRelativePath, toRelativePath, isDir }) => {
                    let tutorialRelativeFromPath = fromRelativePath.replace(".brain", ".guide")
                    let tutorialRelativeToPath = toRelativePath.replace(".brain", ".guide")
                    filesystem.rename(conf.absoluteGlobalDataDirectory(),tutorialRelativeFromPath, tutorialRelativeToPath)
                    .catch (()=>{
                        console.log("File not found for rename: ",tutorialRelativeFromPath,tutorialRelativeToPath)
                        // ignore "not found" error
                    })
                })
                .catch(reason => {
                    console.log(reason)
                })
        })

        app.post('/brains/global/folder', ensureAdminLoggedIn, (req, res) => {
            filesystem.createFolder(conf.absoluteGlobalDataDirectory(), req.body.filePath, res)
                .then((directoryRelativePath) => {
                    let fileRelativePath =  path.join(directoryRelativePath, "placeholder.txt")
                    let content =  "-placeholder for empty directories-"
                    // create file into empty directory. Otherwise the directory is not stored in github.
                    // (github prunes empty directories)
                    filesystem.writeFile(conf.absoluteGlobalDataDirectory(), fileRelativePath, content)
                })
                .catch(error => {
                    console.log(error)
                })
        })

        app.post('/brains/global/save', ensureAdminLoggedIn, (req, res) => {
            let shapeRelativePath = req.body.filePath
            let content = req.body.content
            filesystem.writeFile(conf.absoluteGlobalDataDirectory(), shapeRelativePath, content, res)
                .catch(reason => {
                    console.log(reason)
                })
        })
    }
}
