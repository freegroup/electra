// Electra database service — Milestone 1 entrypoint.
//
// Loads settings.ini + secrets.ini (+ optional settings.local.ini) via
// dotenv, applies pending migrations, boots Fastify on PORT_DATABASE.

const path = require("path")
const dotenv = require("dotenv")

const PROJECT_PATH = path.resolve(__dirname + "/../..")
dotenv.config({ debug: false, path: PROJECT_PATH + "/settings.ini" })
dotenv.config({ debug: false, path: PROJECT_PATH + "/secrets.ini" })
dotenv.config({ debug: false, path: PROJECT_PATH + "/settings.local.ini" })

const Fastify = require("fastify")
const die = require("./utils/die")
const { migrate } = require("./persistence/migrate")
const { bootstrap } = require("./persistence/init")
const { requireLogin, resolvePrincipal, nocache } = require("./auth")
const { DomainError } = require("./utils/errors")

const PORT = parseInt(process.env.PORT_DATABASE || die("missing env variable PORT_DATABASE"), 10)
const LOCALHOST = process.env.LOCALHOST || die("missing env variable LOCALHOST")

// Runs migrations + bootstrap and returns a fully configured Fastify
// instance. Used by main() and by the test harness.
async function build() {
  await migrate()
  await bootstrap()

  const isTest = process.env.NODE_ENV === "test"
  const fastify = Fastify({
    // 10 MB limit for blob uploads (README §6.14).
    bodyLimit: 10 * 1024 * 1024,
    logger: isTest
      ? false
      : { level: process.env.LOG_LEVEL || "info" },
  })

  // Expose auth as decorators so route files can list them in preHandler.
  fastify.decorate("requireLogin", requireLogin)
  fastify.decorate("resolvePrincipal", resolvePrincipal)

  // Global hooks
  fastify.addHook("onRequest", nocache)

  // Error mapping: DomainError → status + structured body
  fastify.setErrorHandler((err, req, reply) => {
    if (err instanceof DomainError) {
      reply.code(err.status).send({
        error: {
          code: err.code,
          message: err.message,
          details: err.details,
        },
      })
      return
    }
    // Fastify's built-in validation errors
    if (err.validation) {
      reply.code(400).send({
        error: {
          code: "bad_request",
          message: err.message,
          details: err.validation,
        },
      })
      return
    }
    req.log.error(err)
    reply.code(500).send({
      error: { code: "internal", message: "internal server error", detail: err.message },
    })
  })

  // Routes
  await fastify.register(require("./routes/scopes"))
  await fastify.register(require("./routes/docs"))
  await fastify.register(require("./routes/review"))
  await fastify.register(require("./routes/publish"))
  await fastify.register(require("./routes/blobs"))
  await fastify.register(require("./routes/rename"))

  fastify.get("/database/health", async () => ({ status: "ok" }))

  return fastify
}

async function main() {
  let fastify
  try {
    fastify = await build()
  } catch (err) {
    console.error("[database] boot failed:", err)
    process.exit(1)
  }
  try {
    await fastify.listen({ port: PORT, host: LOCALHOST })
    fastify.log.info(`Electra database service listening on http://${LOCALHOST}:${PORT}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

module.exports = { build }

if (require.main === module) {
  main()
}
