const filesystem = require("../utils/file")
const github = require('../utils/github')
const conf = require("../configuration")

function nocache(req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
}

module.exports = {
    init: function (app) {

        app.get('/sheets/shared/get', nocache, (req, res) => {
            github.getBlob(req.query.sha)
                .then( file => {
                    res.status(200).send(Buffer.from(file.content, 'base64').toString("utf-8"))
                })
                .catch(exception => {
                    res.status(403).send("error")
                    console.log(exception)
                })
        })

    }
}
