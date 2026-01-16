const conf = require("../configuration")
const persistence = conf.persistence

function handleError(res, err, message) {
    console.log(err)
    let status = err.statusCode || 500
    res.status(status).send(message)
}

module.exports = {
    init: function (app) {

        app.get('/brains/shared/get', (req, res) => {
            persistence.getJSONFile("shared", req.query.sha)
            .then(stream => {
                res.setHeader('Content-Type', 'application/json')
                stream.pipe(res)
            })
            .catch(err => handleError(res, err, "Unable to read file"))
        })
    }
}
