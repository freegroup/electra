const fs = require('fs-extra')
const path = require('path')
const glob = require("glob")
const request = require('request');
const {createHash } =  require('crypto')
  
const filesystem = require("../utils/file")
const generator = require("../thumbnails")
const conf = require("../configuration")
const {nocache, ensureAdminLoggedIn, ensureLoggedIn} = require("./middleware")

const PORT_INGRESS = process.env.PORT_INGRESS || die("missing env variable PORT_INGRESS");
const LOCALHOST = process.env.LOCALHOST || die("missing env variable LOCALHOST");

module.exports = {
    init: function (app) {
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
                    res.send("ok")
                    generator.generateShapeIndex(conf.absoluteUserDataDirectory(req), "user")
                })
                .catch(() => {
                    res.status(403).send("error")
                })
        })

        app.post('/shapes/user/rename', ensureLoggedIn, (req, res) => {
            filesystem.rename(conf.absoluteUserDataDirectory(req), req.body.from, req.body.to, res)
                .then(({ fromRelativePath, toRelativePath }) => {
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
                    return generator.thumbnail(conf.absoluteUserDataDirectory(req), toRelativePath)
                })  
                .then( () => {
                    // and rebuild the shape index.js
                    return generator.generateShapeIndex(conf.absoluteUserDataDirectory(req), "user")
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
                })
                .catch(error => {
                    console.log(error)
                })
        })

        app.post('/shapes/user/save', ensureLoggedIn, (req, res) => {
            let shapeRelativePath = req.body.filePath
            let content = req.body.content
            filesystem.writeFile(conf.absoluteUserDataDirectory(req), shapeRelativePath, content, res)
            .then( (sanitizedRelativePath) => {
                let body = { 
                topic: "shape/generating",
                event :{
                    scope: "user",
                    filePath: shapeRelativePath,
                    imagePath: shapeRelativePath.replace(".shape", ".png"),
                    jsPath: shapeRelativePath.replace(".shape", ".js")
                }}                    
                request(
                    {
                        url: `http://${LOCALHOST}:${PORT_INGRESS}/broadcast`,
                        method: "POST",
                        json: body
                    })
                return sanitizedRelativePath
            })
            .then((sanitizedRelativePath) => {
                    console.log("Thumbnail",sanitizedRelativePath)
                    return generator.thumbnail(conf.absoluteUserDataDirectory(req), sanitizedRelativePath)
                })
                .then( () => {
                    console.log("Shape generate")
                    return generator.generateShapeIndex(conf.absoluteUserDataDirectory(req), "user")
                })
                .then( () => {
                    let body = { 
                    topic: "shape/generated",
                    event :{
                        scope: "user",
                        filePath: shapeRelativePath,
                        imagePath: shapeRelativePath.replace(".shape", ".png"),
                        jsPath: shapeRelativePath.replace(".shape", ".js")
                    }}                    
                    return request(
                        {
                            url: `http://${LOCALHOST}:${PORT_INGRESS}/broadcast`,
                            method: "POST",
                            json: body
                        })
                })
                .catch(reason => {
                    console.log(reason)
                })
        })
    }
}
