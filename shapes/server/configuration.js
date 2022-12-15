const path = require("path")

module.exports = {

    absoluteRootDataDirectory: () => {
        let rootPath = process.env.DATA_DIR || (__dirname + "/../data/")
        return path.normalize(rootPath)
    },

    absoluteGlobalDataDirectory: () => {
        let rootPath = process.env.DATA_DIR || (__dirname + "/../data/")
        return path.normalize(`${rootPath}global/`)
    },

    absoluteUserDataDirectory: ( req ) => {
        if(req){
            let hash = req.get("x-hash")
            let rootPath = process.env.DATA_DIR || (__dirname + "/../data/")
            return path.normalize(`${rootPath}user/${hash}/`)
        }
        let rootPath = process.env.DATA_DIR || (__dirname + "/../data/")
        return path.normalize(`${rootPath}user/`)
    },

    githubGlobalDataDirectory: () => {
        return "data/global/"
    },

    githubUserDataDirectory: ( req ) => {
        let hash = req.get("x-hash")
        return path.normalize(`data/user/${hash}/`)
    }
}

