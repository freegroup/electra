const {createHash } =  require('crypto')
  
module.exports = {

    nocache: function (req, res, next) {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        next();
    },

    ensureAdminLoggedIn: function (req, res, next) {
        let role = req.get("x-role")
        if (role !== "admin") {
            res.status(401).send('string')
            return
        }
        next();
    },
    
    ensureLoggedIn: function(req, res, next) {
        let role = req.get("x-role")
        if (role !== "admin" && role !== "user") {
            res.status(401).send('string')
            return
        }
        let mail = req.get("x-mail")
        if (!mail) {
            res.status(401).send('Missing x-mail header')
            return
        }
        let hash = createHash('sha256')
        hash.update(mail)
        req.headers["x-hash"]=hash.digest('hex')
        next()
    }
}
