const fs = require('fs-extra')
const path = require('path')

const filesystem = require("../utils/file")
const github = require('../utils/github')

const conf = require("../configuration")


function nocache(req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
}

function ensureAdminLoggedIn (req, res, next) {
    let role = req.get("x-role")
    if (role !== "admin") {
        res.status(401).send('string')
        return
    }
    next();
}

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

        app.get('/sheets/global/share', nocache, (req, res) => {
            github.hash(path.join(conf.githubGlobalDataDirectory(), req.query.filePath))
            .then( sha => {
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
                    .then((sanitizedRelativePath) => {
                        let githubPath = path.join(conf.githubGlobalDataDirectory(), sanitizedRelativePath)
                        return github.deleteDirectory(githubPath, `delete directory "${fileRelativePath}"` )
                    })
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
                        files = [sanitizedRelativePaths]
                        github.delete(files.map(file => { return { path: path.join(conf.githubUserDataDirectory(req), file) } }), `delete of file "${sanitizedRelativePaths}"`)
                        .catch( ()=>{ /* ignore */})
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
                    repoFromRelativePath = path.join(conf.githubGlobalDataDirectory(), fromRelativePath)
                    repoToRelativePath = path.join(conf.githubGlobalDataDirectory(), toRelativePath)

                    if (isDir) {
                        // rename all files in github
                        github.renameDirectory(repoFromRelativePath, repoToRelativePath, `rename ${repoFromRelativePath} => ${repoToRelativePath}`)
                        .catch(error => { 
                            console.log(error) 
                        })
                    }
                    else {
                        let fromFiles = [repoFromRelativePath]
                        let toFiles = [repoToRelativePath]
                        // rename ALL files in one commit in github
                        github.renameFiles(fromFiles, toFiles, ` ${fromRelativePath} => ${toRelativePath}`)
                        .catch( error => { 
                            console.log(error) 
                        })
                    }
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
                    return github.commit([{ path: path.join(conf.githubGlobalDataDirectory(), fileRelativePath), content: content }], "folder creation")
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
                    return github.commit([{ path: path.join(conf.githubGlobalDataDirectory(), sanitizedRelativePath ), content} ], reason)
                })
                .catch(reason => {
                    console.log(reason)
                })
        })
    }
}
