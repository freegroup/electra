const fs = require('fs-extra')
const path = require('path')
const glob = require("glob")
const {createHash } =  require('crypto')
  
const filesystem = require("../utils/file")
const github = require('../utils/github')
const generator = require("../thumbnails")
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
        app.get('/shapes/user/list', nocache, ensureLoggedIn, (req, res) => {
            filesystem.listFiles(conf.absoluteUserDataDirectory(req), req.query.path, res)
                .catch(exception => {
                    console.log(exception)
                })
        })

        app.get('/shapes/user/get', nocache, ensureLoggedIn, (req, res) => {
            filesystem.getBinary(conf.absoluteUserDataDirectory(req), req.query.filePath, res)
                .catch(error => {
                    console.log(error)
                })
        })


        app.post('/shapes/user/delete', ensureLoggedIn, (req, res) => {
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
                        return generator.generateShapeIndex(conf.absoluteUserDataDirectory(req), "user")
                    })
                    .catch((error) => {
                        console.log(error)
                        res.status(403).send("error")
                    })
            }
            else {
                let files = [fileRelativePath,
                    fileRelativePath.replace(".shape", ".js"),
                    fileRelativePath.replace(".shape", ".md"),
                    fileRelativePath.replace(".shape", ".custom"),
                    fileRelativePath.replace(".shape", ".png")
                ]
                let promisses = files.map(file => filesystem.delete(conf.absoluteUserDataDirectory(req), file))
                Promise.allSettled(promisses)
                    .then((sanitizedRelativePaths) => {
                        console.log(sanitizedRelativePaths)
                        github.delete(files.map(file => { return { path: path.join(conf.githubUserDataDirectory(req), file) } }), "-empty-")
                        res.send("ok")
                        generator.generateShapeIndex(conf.absoluteUserDataDirectory(req), "user")
                    })
                    .catch(() => {
                        res.status(403).send("error")
                    })
            }
        })

        app.post('/shapes/user/rename', ensureLoggedIn, (req, res) => {
            filesystem.rename(conf.absoluteUserDataDirectory(req), req.body.from, req.body.to, res)
                .then(({ fromRelativePath, toRelativePath, isDir }) => {
                    repoFromRelativePath = path.join(conf.githubUserDataDirectory(req), fromRelativePath)
                    repoToRelativePath = path.join(conf.githubUserDataDirectory(req), toRelativePath)

                    if (isDir) {
                        // rename all files in github
                        github.renameDirectory(repoFromRelativePath, repoToRelativePath, "-rename-")
                        // find all affected "*.shapes* files to calculate the new JS code"
                        .then ( () => {
                            let absoluteDirectoryPath = path.join(conf.absoluteUserDataDirectory(req), toRelativePath)
                            return glob.sync(absoluteDirectoryPath+"/**/*.shape")
                        })
                        // generate for each "*.shape" file the js, thumbnail and markdown content
                        .then((files) => {
                            let promisses = files.map( ( file => generator.thumbnail(conf.absoluteUserDataDirectory(req), file.replace(conf.absoluteGlobalDataDirectory(), "")) ))
                            return Promise.all(promisses)
                        })
                        // commit this changes in one commit to github
                        .then( thumbnailFiles => {
                            thumbnailFiles = thumbnailFiles.flatMap( f => f)
                            thumbnailFiles = thumbnailFiles.map(file => { return { path: path.join(conf.githubUserDataDirectory(req), file.path), content: file.content } })
                            return github.commit(thumbnailFiles, "folder rename")
                        })
                        // and rebuild the index.js file
                        .then( () => {
                            // and rebuild the shape index.js
                            return generator.generateShapeIndex(conf.absoluteUserDataDirectory(req), "user")
                        })
                        .catch(error => { 
                            console.log(error) 
                        })
                    }
                    else {
                        let fromFiles = [
                            repoFromRelativePath,
                            repoFromRelativePath.replace(".shape", ".js"),
                            repoFromRelativePath.replace(".shape", ".md"),
                            repoFromRelativePath.replace(".shape", ".custom"),
                            repoFromRelativePath.replace(".shape", ".png")
                        ]
                        let toFiles = [
                            repoToRelativePath,
                            repoToRelativePath.replace(".shape", ".js"),
                            repoToRelativePath.replace(".shape", ".md"),
                            repoToRelativePath.replace(".shape", ".custom"),
                            repoToRelativePath.replace(".shape", ".png")
                        ]
                        github.renameFiles(fromFiles, toFiles, "-rename-")
                        .then( () => {
                            // we must generate the JS code again because the file name is part of the generated part name.
                            return generator.thumbnail(conf.absoluteUserDataDirectory(req), toRelativePath)
                        })
                        .then( (files) => {
                            // commit the new generated file content
                            return github.commit(files.map(file => { return { path: path.join(conf.githubUserDataDirectory(req), file.path), content: file.content } }), reason)
                        })      
                        .then( () => {
                            // and rebuild the shape index.js
                            return generator.generateShapeIndex(conf.absoluteUserDataDirectory(req), "user")
                        })  
                        .catch( error => { 
                            console.log(error) 
                        })
                    }
                })
                .catch(reason => {
                    console.log(reason)
                })
        })

        app.post('/shapes/user/folder', ensureLoggedIn, (req, res) => {
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

        app.post('/shapes/user/save', ensureLoggedIn, (req, res) => {
            let shapeRelativePath = req.body.filePath
            let content = req.body.content
            let reason = req.body.commitMessage || "-empty-"
            filesystem.writeFile(conf.absoluteUserDataDirectory(req), shapeRelativePath, content, res)
                .then((sanitizedRelativePath) => {
                    return generator.thumbnail(conf.absoluteUserDataDirectory(req), sanitizedRelativePath)
                })
                .then((files) => {
                    return github.commit(files.map(file => { return { path: path.join(conf.githubUserDataDirectory(req), file.path), content: file.content } }), reason)
                })
                .then( () => {
                    return generator.generateShapeIndex(conf.absoluteUserDataDirectory(req), "user")
                })
                .catch(reason => {
                    console.log(reason)
                })
        })
    }
}
