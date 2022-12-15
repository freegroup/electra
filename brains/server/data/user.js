const fs = require('fs-extra')
const path = require('path')
const glob = require("glob")
const {createHash } =  require('crypto')
  
const filesystem = require("../utils/file")
const github = require('../utils/github')
const conf = require("../configuration")

function nocache(req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
}

function ensureLoggedIn  (req, res, next) {
    let role = req.get("x-role")
    if (role !== "admin" && role !== "user") {
        res.status(401).send('string')
        return
    }
    let hash = createHash('sha256')
    hash.update(req.get("x-mail"))
    req.headers["x-hash"]=hash.digest('hex')
    next()
}

module.exports = {
    init: function (app) {
        // TODO: migrate to REST service API
        app.get('/brains/user/list', nocache, ensureLoggedIn, (req, res) => {
            filesystem.listFiles(conf.absoluteUserDataDirectory(req), req.query.path, res)
                .catch(exception => {
                    console.log(exception)
                })
        })

        app.get('/brains/user/get', nocache, ensureLoggedIn, (req, res) => {
            filesystem.getJSONFile(conf.absoluteUserDataDirectory(req), req.query.filePath, res)
                .catch(exception => {
                    console.log(exception)
                })
        })

        app.get('/brains/user/share', nocache, (req, res) => {
            github.hash(path.join(conf.absoluteUserDataDirectory(req), req.query.filePath))
            .then( sha => {
                res.status(200).send({ filePath: sha})
            })
            .catch(exception => {
                res.status(403).send("error")
                console.log(exception)
            })
        })

        app.get('/brains/user/image', nocache, ensureLoggedIn, (req, res) => {
            filesystem.getBinaryFile(conf.absoluteUserDataDirectory(req), req.query.filePath, res)
                .catch(error => {
                    console.log(error)
                })
        })


        app.post('/brains/user/delete', ensureLoggedIn, (req, res) => {
            let fileRelativePath = req.body.filePath
            let isDir = fs.lstatSync(path.join(conf.absoluteUserDataDirectory(req), fileRelativePath)).isDirectory()
            if (isDir) {
                filesystem.delete(conf.absoluteUserDataDirectory(req), fileRelativePath)
                    .then((sanitizedRelativePath) => {
                        let githubPath = path.join(conf.githubUserDataDirectory(req), sanitizedRelativePath)
                        return github.deleteDirectory(githubPath, "-delete directory-")
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

                filesystem.delete(conf.absoluteUserDataDirectory(req), fileRelativePath)
                    .then((sanitizedRelativePaths) => {
                        files = [sanitizedRelativePaths]
                        let tutorialRelativePath = sanitizedRelativePaths.replace(".brain", ".guide")
                        filesystem.delete(conf.absoluteUserDataDirectory(req), tutorialRelativePath)
                        .then((guideRelativePAth)=>{
                            files.push(guideRelativePAth)
                        }).catch (()=>{
                            // ignore "not found" error
                        })
                        .finally (()=> {
                            github.delete(files.map(file => { return { path: path.join(conf.githubUserDataDirectory(req), file) } }), "-empty-")
                            .catch( ()=>{ /* ignore */})
                            res.send("ok")
                        })
                    })
                    .catch(() => {
                        res.status(403).send("error")
                    })
            }
        })

        app.post('/brains/user/rename', ensureLoggedIn, (req, res) => {
            filesystem.rename(conf.absoluteUserDataDirectory(req), req.body.from, req.body.to, res)
                .then(({ fromRelativePath, toRelativePath, isDir }) => {
                    repoFromRelativePath = path.join(conf.githubUserDataDirectory(req), fromRelativePath)
                    repoToRelativePath = path.join(conf.githubUserDataDirectory(req), toRelativePath)

                    if (isDir) {
                        // rename all files in github
                        github.renameDirectory(repoFromRelativePath, repoToRelativePath, "-rename-")
                        .catch(error => { 
                            console.log(error) 
                        })
                    }
                    else {
                        let fromFiles = [repoFromRelativePath]
                        let toFiles = [repoToRelativePath]
                        let tutorialRelativeFromPath = fromRelativePath.replace(".brain", ".guide")
                        let tutorialRelativeToPath = toRelativePath.replace(".brain", ".guide")
                        filesystem.rename(conf.absoluteUserDataDirectory(req),tutorialRelativeFromPath, tutorialRelativeToPath)
                        .then( (guideFromPath, guideToPath, isDir )=>{
                            fromFiles.push(guideFromPath)
                            toFiles.push(guideToPath)
                        })
                        .catch (()=>{
                            // ignore "not found" error
                        })
                        .finally (()=> {
                            // rename ALL files in one commit in github
                            github.renameFiles(fromFiles, toFiles, ` ${fromRelativePath} => ${toRelativePath}`)
                            .catch( error => { 
                                console.log(error) 
                            })
                        })
                    }
                })
                .catch(reason => {
                    console.log(reason)
                })
        })

        app.post('/brains/user/folder', ensureLoggedIn, (req, res) => {
            filesystem.createFolder(conf.absoluteUserDataDirectory(req), req.body.filePath, res)
                .then((directoryRelativePath) => {
                    let fileRelativePath =  path.join(directoryRelativePath, "placeholder.txt")
                    let content =  "-placeholder for empty directories-"
                    // create file into empty directory. Otherwise the directory is not stored in github.
                    // (github prunes empty directories)
                    filesystem.writeFile(conf.absoluteUserDataDirectory(req), fileRelativePath, content)
                    return github.commit([{ path: path.join(conf.githubUserDataDirectory(req), fileRelativePath), content: content }], "folder creation")
                })
                .catch(error => {
                    console.log(error)
                })
        })

        app.post('/brains/user/save', ensureLoggedIn, (req, res) => {
            let shapeRelativePath = req.body.filePath
            let content = req.body.content
            let reason = req.body.commitMessage || "-empty-"
            filesystem.writeFile(conf.absoluteUserDataDirectory(req), shapeRelativePath, content, res)
                .then((sanitizedRelativePath) => {
                    return github.commit([{ path: path.join(conf.githubUserDataDirectory(req), sanitizedRelativePath), content: content } ], reason)
                })
                .catch(reason => {
                    console.log(reason)
                })
        })
    }
}
