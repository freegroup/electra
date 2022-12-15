const github = require('../utils/github')


module.exports = {
    init: function (app) {

        app.get('/brains/shared/get', (req, res) => {
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
