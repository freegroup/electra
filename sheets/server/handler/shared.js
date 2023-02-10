const filesystem = require("../utils/file")
const conf = require("../configuration")


module.exports = {
    init: function (app) {

        app.get('/sheets/shared/get', (req, res) => {
            filesystem.getJSONFile(conf.absoluteSharedDataDirectory(), req.query.sha, res)
            .catch(exception => {
                console.log(exception)
            })
        })
    }
}
