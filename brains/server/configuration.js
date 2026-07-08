const path = require("path")
const die = require("./utils/die")
const FileSystemAdapter = require("./persistence/filesystem-adapter")
const DatabaseAdapter = require("./persistence/database-adapter")

const PROJECT_PATH = path.resolve(__dirname+ "/../..")

// Pick persistence backend. Default remains the legacy filesystem adapter so
// existing deployments keep working. Set BRAINS_PERSISTENCE=database in
// settings.ini to switch to the new HTTP-backed adapter.
const BACKEND = (process.env.BRAINS_PERSISTENCE || "filesystem").toLowerCase()

const configuration = {}

if (BACKEND === "database") {
    const port = process.env.PORT_DATABASE || die("Environment Variable PORT_DATABASE missing")
    const host = process.env.LOCALHOST || die("Environment Variable LOCALHOST missing")
    configuration.persistence = new DatabaseAdapter({
        baseUrl: `http://${host}:${port}`,
        appScopePath: "electra/apps/brains",
        usersScopePath: "electra/users",
    })
    console.log(`[brains] persistence: DatabaseAdapter → http://${host}:${port}`)
} else {
    let LOCAL_DATADIR = process.env.DATADIR_BRAINS || die("Environment Variable DATADIR_BRAINS missing")
    LOCAL_DATADIR = path.normalize(`${PROJECT_PATH}/${LOCAL_DATADIR}`)

    configuration.absoluteGlobalDataDirectory = () => path.normalize(`${LOCAL_DATADIR}/global/`)
    configuration.absoluteSharedDataDirectory = () => path.normalize(`${LOCAL_DATADIR}/shared/`)
    configuration.absoluteUserDataDirectory = (req) => {
        const hash = req.get("x-hash")
        return path.normalize(`${LOCAL_DATADIR}/user/${hash}/`)
    }
    configuration.persistence = new FileSystemAdapter({
        globalDataDir: configuration.absoluteGlobalDataDirectory,
        sharedDataDir: configuration.absoluteSharedDataDirectory,
        userDataDir: configuration.absoluteUserDataDirectory,
    })
    console.log(`[brains] persistence: FileSystemAdapter → ${LOCAL_DATADIR}`)
}

module.exports = configuration
