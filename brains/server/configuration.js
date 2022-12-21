const path = require("path")
const die = require("./utils/die")

const GITHUB_DATADIR_BRAINS = process.env.GITHUB_DATADIR_BRAINS ||  die("Environment Varialbe GITHUB_DATADIR_BRAINS missing")
const LOCAL_DATADIR_BRAINS = path.resolve(__dirname+ "/../data")

module.exports = {

    absoluteGlobalDataDirectory: () => {
        return path.normalize(`${LOCAL_DATADIR_BRAINS}/global/`)
    },

    absoluteUserDataDirectory: ( req ) => {
        let hash = req.get("x-hash")
        return path.normalize(`${LOCAL_DATADIR_BRAINS}/user/${hash}/`)
    },

    githubGlobalDataDirectory: () => {
        return `${GITHUB_DATADIR_BRAINS}/global/`
    },

    githubUserDataDirectory: ( req ) => {
        let hash = req.get("x-hash")
        return path.normalize(`${GITHUB_DATADIR_BRAINS}/user/${hash}/`)
    }

}

