
const AUTHOR_URL =  process.env.AUTHOR_URL || "http://localhost:3000"

function nocache(req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
}

module.exports = {
    init: function (app) {

        app.get('/sheets/pdf', nocache, (req, res) => {
            let sha = req.query.sha      
            let {render} = require("../converter/pdf")
            render(`${AUTHOR_URL}/page.html?sha=${sha}`).then(pdf => {
              res.set({'Content-Type': 'application/pdf', 'Content-Length': pdf.length})
              res.send(pdf)
            })
        })
    }
}
