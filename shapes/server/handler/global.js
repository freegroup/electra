
const path = require('path')
const request = require('request');

const filesystem = require("../utils/file")
const generator = require("../thumbnails")
const conf = require("../configuration")
const {nocache, ensureAdminLoggedIn, ensureLoggedIn} = require("./middleware")


const PORT_INGRESS = process.env.PORT_INGRESS || die("missing env variable PORT_INGRESS");
const LOCALHOST = process.env.LOCALHOST || die("missing env variable LOCALHOST");

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
                    res.send("ok")
                    generator.generateShapeIndex(conf.absoluteGlobalDataDirectory(),"global")
                })
                .catch(() => {
                    res.status(403).send("error")
                })
        })

        app.post('/shapes/global/rename', ensureAdminLoggedIn, (req, res) => {
            filesystem.rename(conf.absoluteGlobalDataDirectory(), req.body.from, req.body.to, res)
                .then( () => {
                    // we must generate the JS code again because the file name is part of the generated part name.
                    return generator.thumbnail(conf.absoluteGlobalDataDirectory(), toRelativePath)
                })
                .then( () => {
                    // and rebuild the shape index.js
                    return generator.generateShapeIndex(conf.absoluteGlobalDataDirectory(),"global")
                })  
                .catch( error => { 
                    console.log(error) 
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
                .then( (sanitizedRelativePath) => {
                    let body = { 
                    topic: "shape/generating",
                    event :{
                        scope: "global",
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
                    return generator.thumbnail(conf.absoluteGlobalDataDirectory(), sanitizedRelativePath)
                })
                .then( () => {
                    // and rebuild the shape index.js
                    return generator.generateShapeIndex(conf.absoluteGlobalDataDirectory(),"global")
                })
                .then( () => {
                    let body = { 
                    topic: "shape/generated",
                    event :{
                        scope: "global",
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
