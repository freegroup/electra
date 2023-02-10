const die = require("./utils/die")
const path = require("path")

const PROJECT_PATH = path.resolve(__dirname+ "/../..")
let LOCAL_DATADIR =  process.env.DATADIR_SHAPES ||  die("Environment Varialbe DATADIR_SHAPES missing")
LOCAL_DATADIR = path.normalize(`${PROJECT_PATH}/${LOCAL_DATADIR}`)

module.exports = {

    absoluteGlobalDataDirectory: () => {
        return path.normalize(`${LOCAL_DATADIR}/global/`)
    },

    absoluteSharedDataDirectory: () => {
        return path.normalize(`${LOCAL_DATADIR}/shared/`)
    },

    absoluteUserDataRootDirectory: (  ) => {
        return path.normalize(`${LOCAL_DATADIR}/user/`)
    },

    absoluteUserDataDirectory: ( req ) => {
        let hash = req.get("x-hash")
        return path.normalize(`${LOCAL_DATADIR}/user/${hash}/`)
    }
}

