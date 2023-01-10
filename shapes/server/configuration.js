const die = require("./utils/die")
const path = require("path")

const GITHUB_DATADIR= process.env.GITHUB_DATADIR_SHAPES ||  die("Environment Varialbe GITHUB_DATADIR_SHAPES missing")
const LOCAL_DATADIR = path.resolve(__dirname+ "/../data")

module.exports = {

    absoluteGlobalDataDirectory: () => {
        return path.normalize(`${LOCAL_DATADIR}/global/`)
    },

    absoluteUserDataRootDirectory: (  ) => {
        return path.normalize(`${LOCAL_DATADIR}/user/`)
    },

    absoluteUserDataDirectory: ( req ) => {
        let hash = req.get("x-hash")
        return path.normalize(`${LOCAL_DATADIR}/user/${hash}/`)
    },

    githubGlobalDataDirectory: () => {
        return `${GITHUB_DATADIR}/global/`
    },

    githubUserDataDirectory: ( req ) => {
        let hash = req.get("x-hash")
        return path.normalize(`${GITHUB_DATADIR}/user/${hash}/`)
    }
}

