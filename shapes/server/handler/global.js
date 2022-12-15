const fs = require('fs-extra')
const path = require('path')
const glob = require("glob")

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
        app.get('/shapes/global/list', nocache, (req, res) => {
            filesystem.listFiles(conf.absoluteGlobalDataDirectory(), req.query.path, res)
                .catch(exception => {
                    console.log(exception)
                })
        })

        app.get('/shapes/global/get', nocache, (req, res) => {
            filesystem.getBinary(conf.absoluteGlobalDataDirectory(), req.query.filePath, res)
                .catch(error => {
                    console.log(error)
                })
        })

        app.post('/shapes/global/delete', ensureAdminLoggedIn, (req, res) => {
            let fileRelativePath = req.body.filePath
            let isDir = fs.lstatSync(path.join(conf.absoluteGlobalDataDirectory(), fileRelativePath)).isDirectory()
            if (isDir) {
                filesystem.delete(conf.absoluteGlobalDataDirectory(), fileRelativePath)
                    .then((sanitizedRelativePath) => {
                        let githubPath = path.join(conf.githubGlobalDataDirectory(), sanitizedRelativePath)
                        return github.deleteDirectory(githubPath, "-delete directory-")
                    })
                    .then(() => {
                        res.send("ok")
                        return generator.generateShapeIndex(conf.absoluteGlobalDataDirectory(),"global")
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
                let promisses = files.map(file => filesystem.delete(conf.absoluteGlobalDataDirectory(), file))
                Promise.allSettled(promisses)
                    .then((sanitizedRelativePaths) => {
                        console.log(sanitizedRelativePaths)
                        github.delete(files.map(file => { return { path: path.join(conf.githubGlobalDataDirectory(), file) } }), "-empty-")
                        res.send("ok")
                        generator.generateShapeIndex(conf.absoluteGlobalDataDirectory(),"global")
                    })
                    .catch(() => {
                        res.status(403).send("error")
                    })
            }
        })

        app.post('/shapes/global/rename', ensureAdminLoggedIn, (req, res) => {
            filesystem.rename(conf.absoluteGlobalDataDirectory(), req.body.from, req.body.to, res)
                .then(({ fromRelativePath, toRelativePath, isDir }) => {
                    repoFromRelativePath = path.join(conf.githubGlobalDataDirectory(), fromRelativePath)
                    repoToRelativePath = path.join(conf.githubGlobalDataDirectory(), toRelativePath)

                    if (isDir) {
                        // rename all files in github
                        github.renameDirectory(repoFromRelativePath, repoToRelativePath, "-rename-")
                        // find all affected "*.shapes* files to calculate the new JS code"
                        .then ( () => {
                            let absoluteDirectoryPath = path.join(conf.absoluteGlobalDataDirectory(), toRelativePath)
                            return glob.sync(absoluteDirectoryPath+"/**/*.shape")
                        })
                        // generate for each "*.shape" file the js, thumbnail and markdown content
                        .then((files) => {
                            let promisses = files.map( ( file => generator.thumbnail(conf.absoluteGlobalDataDirectory(), file.replace(conf.absoluteGlobalDataDirectory(), "")) ))
                            return Promise.all(promisses)
                        })
                        // commit this changes in one commit to github
                        .then( thumbnailFiles => {
                            thumbnailFiles = thumbnailFiles.flatMap( f => f)
                            thumbnailFiles = thumbnailFiles.map(file => { return { path: path.join(conf.githubGlobalDataDirectory(), file.path), content: file.content } })
                            return github.commit(thumbnailFiles, "folder rename")
                        })
                        // and rebuild the index.js file
                        .then( () => {
                            // and rebuild the shape index.js
                            return generator.generateShapeIndex(conf.absoluteGlobalDataDirectory(),"global")
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
                            return generator.thumbnail(conf.absoluteGlobalDataDirectory(), toRelativePath)
                        })
                        .then( (files) => {
                            // commit the new generated file content
                            return github.commit(files.map(file => { return { path: path.join(conf.githubGlobalDataDirectory(), file.path), content: file.content } }), reason)
                        })      
                        .then( () => {
                            // and rebuild the shape index.js
                            return generator.generateShapeIndex(conf.absoluteGlobalDataDirectory(),"global")
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

        app.post('/shapes/global/folder', ensureAdminLoggedIn, (req, res) => {
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

        app.post('/shapes/global/save', ensureAdminLoggedIn, (req, res) => {
            let shapeRelativePath = req.body.filePath
            let content = req.body.content
            let reason = req.body.commitMessage || "-empty-"
            filesystem.writeFile(conf.absoluteGlobalDataDirectory(), shapeRelativePath, content, res)
                .then((sanitizedRelativePath) => {
                    return generator.thumbnail(conf.absoluteGlobalDataDirectory(), sanitizedRelativePath)
                })
                .then((files) => {
                    return github.commit(files.map(file => { return { path: path.join(conf.githubGlobalDataDirectory(), file.path), content: file.content } }), reason)
                })
                .then( () => {
                    // and rebuild the shape index.js
                    return generator.generateShapeIndex(conf.absoluteGlobalDataDirectory(),"global")
                })
                .catch(reason => {
                    console.log(reason)
                })
        })
    }
}
