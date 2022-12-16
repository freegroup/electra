const path = require("path")
const die = require("./utils/die")

const GITHUB_DATADIR_BRAINS = process.env.GITHUB_DATADIR_BRAINS ||  die("Environment Varialbe GITHUB_DATADIR_BRAINS missing")

module.exports = {

    absoluteGlobalDataDirectory: () => {
        let rootPath = process.env.DATA_DIR || (__dirname + "/../data/")
        return path.normalize(`${rootPath}global/`)
    },

    absoluteUserDataDirectory: ( req ) => {
        let hash = req.get("x-hash")
        let rootPath = process.env.DATA_DIR || (__dirname + "/../data/")
        return path.normalize(`${rootPath}user/${hash}/`)
    },

    githubGlobalDataDirectory: () => {
        return `${GITHUB_DATADIR_BRAINS}/global`
    },

    githubUserDataDirectory: ( req ) => {
        let hash = req.get("x-hash")
        return path.normalize(`${GITHUB_DATADIR_BRAINS}/user/${hash}/`)
    }

}

