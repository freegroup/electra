const fs = require('fs-extra')
const {createHash } =  require('crypto')
const path = require('path')

const {nocache, ensureAdminLoggedIn, ensureLoggedIn} = require("./middleware")
const filesystem = require("../utils/file")
const conf = require("../configuration")

const PORT_INGRESS = process.env.PORT_INGRESS || die("missing env variable PORT_INGRESS");
const AUTHOR_URL =  `http://localhost:${PORT_INGRESS}/author`



module.exports = {
    init: function (app) {
        // TODO: migrate to REST service API
        app.get('/sheets/global/list', nocache, (req, res) => {
            filesystem.listFiles(conf.absoluteGlobalDataDirectory(), req.query.path, res)
                .catch(exception => {
                    console.log(exception)
                })
        })

        app.get('/sheets/global/get', nocache, (req, res) => {
            filesystem.getJSONFile(conf.absoluteGlobalDataDirectory(), req.query.filePath, res)
                .catch(exception => {
                    console.log(exception)
                })
        })

        app.post('/sheets/global/share', ensureLoggedIn, (req, res) => {
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

        app.get('/sheets/global/image', nocache, (req, res) => {
            filesystem.getBinaryFile(conf.absoluteGlobalDataDirectory(), req.query.filePath, res)
                .catch(error => {
                    console.log(error)
                })
        })


        app.post('/sheets/global/delete', ensureAdminLoggedIn, (req, res) => {
            let fileRelativePath = req.body.filePath
            let isDir = fs.lstatSync(path.join(conf.absoluteGlobalDataDirectory(), fileRelativePath)).isDirectory()
            if (isDir) {
                filesystem.delete(conf.absoluteGlobalDataDirectory(), fileRelativePath)
                    .then(() => {
                        res.send("ok")
                    })
                    .catch((error) => {
                        console.log(error)
                        res.status(403).send("error")
                    })
            }
            else {
                filesystem.delete(conf.absoluteGlobalDataDirectory(), fileRelativePath)
                    .then((sanitizedRelativePaths) => {
                        res.send("ok")
                    })
                    .catch(() => {
                        res.status(403).send("error")
                    })
            }
        })

        app.post('/sheets/global/rename', ensureAdminLoggedIn, (req, res) => {
            filesystem.rename(conf.absoluteGlobalDataDirectory(), req.body.from, req.body.to, res)
                .then(({ fromRelativePath, toRelativePath, isDir }) => {
                    console.log("done")
                })
                .catch(reason => {
                    console.log(reason)
                })
        })

        app.post('/sheets/global/folder', ensureAdminLoggedIn, (req, res) => {
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

        app.post('/sheets/global/save', ensureAdminLoggedIn, (req, res) => {
            let shapeRelativePath = req.body.filePath
            let content = req.body.content
            let reason = req.body.commitMessage || "-empty-"
            filesystem.writeFile(conf.absoluteGlobalDataDirectory(), shapeRelativePath, content, res)
                .then((sanitizedRelativePath) => {
                    let {render} = require("../converter/screenshot")
                    let jpg = path.join(conf.absoluteGlobalDataDirectory(), sanitizedRelativePath ).replace(".sheet",".jpg")
                    render(`${AUTHOR_URL}/page.html?global=${shapeRelativePath}&mode=worksheet`, jpg)
                    return sanitizedRelativePath
                })
               .catch(reason => {
                    console.log(reason)
                })
        })
    }
}
