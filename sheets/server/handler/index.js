const express = require('express')
const fs = require('fs-extra')
const path = require('path')
const {createHash } =  require('crypto')
  
const multistream = require('../utils/multistream')
const conf = require("../configuration")

function nocache(req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
}


function userHash  (req, res, next) {
    let mail = req.get("x-mail")
    if (mail) {
        let hash = createHash('sha256')
        hash.update(mail)
        req.headers["x-hash"]=hash.digest('hex')
    }
    next()
}

module.exports = {
    init: function (app) {

        app.get('/sheets/index.json', nocache, userHash, (req, res) => {
            // All JSON Files which can be concatenated and returned in a single JSON-Array
            //
            let readFiles =  [
                fs.readFile(path.join(conf.absoluteGlobalDataDirectory(), '/index.json'), "utf-8"),
            ]
            // append the user spezific file if a user is logged in and the file exists
            //
            if (req.get("x-hash")){
                let userIndex = path.join(conf.absoluteUserDataDirectory(req), '/index.json')
                if(fs.existsSync(userIndex)) {
                    readFiles.push(fs.readFile(userIndex, "utf-8"))
                }
            }
            // Read all of them and merge them into a single file
            //
            return Promise.all(readFiles)
            .then( strings =>{
                return strings.map( x => JSON.parse(x))
            })
            .then( (json) => {
                function arrayUnique(array) {
                    var a = array.concat();
                    for(var i=0; i<a.length; ++i) {
                        for(var j=i+1; j<a.length; ++j) {
                            if(a[i].name === a[j].name)
                                a.splice(j--, 1);
                        }
                    }
                    return a;
                }
                return arrayUnique(json.flat());
            })
            .then( (json => {
                res.status(200).send(json)
            })) 
        })
    }
}
