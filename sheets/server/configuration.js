const path = require("path")
const die = require("./utils/die")

const GITHUB_DATADIR_SHEETS = process.env.GITHUB_DATADIR_SHEETS ||  die("Environment Varialbe GITHUB_DATADIR_SHEETS missing")
const LOCAL_DATADIR_SHEETS = path.resolve(__dirname+ "/../data")

module.exports = {

    absoluteGlobalDataDirectory: () => {
        return path.normalize(`${LOCAL_DATADIR_SHEETS}/global/`)
    },

    absoluteUserDataDirectory: ( req ) => {
        let hash = req.get("x-hash")
        return path.normalize(`${LOCAL_DATADIR_SHEETS}/user/${hash}/`)
    },

    githubGlobalDataDirectory: () => {
        return `${GITHUB_DATADIR_SHEETS}/global/`
    },

    githubUserDataDirectory: ( req ) => {
        let hash = req.get("x-hash")
        return path.normalize(`${GITHUB_DATADIR_SHEETS}/user/${hash}/`)
    }
}

