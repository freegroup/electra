// What pm2 runs on the SERVER (02_playbook_deploy.yaml starts this file, not
// ecosystem.config.js). It is a deliberate full copy of ecosystem.config.js
// minus "database-admin" — the localhost-only god-view explorer, which must
// never run in production.
//
// The duplication is intentional and the cost is real: a new service has to be
// added HERE as well, or it simply will not start on the server.
//
// Do NOT drop the ".config.js" from the name. pm2 decides by filename alone
// whether a file is an ecosystem config or a script to execute; as plain
// "ecosystem.production.js" it started THIS FILE as a single node process and
// none of the services below came up.
module.exports = {
    apps : [
          {
            name   : "author",
            cwd : "./author",
            script: "node",
            args: "./server/index",
            env: { "NODE_ENV": "production" }
          },
          {
            name   : "brains",
            cwd : "./brains",
            script: "node",
            args: "./server/index",
            env: {
              "NODE_ENV": "production",
              "BRAINS_PERSISTENCE": "database"
            }
          },
          {
            name   : "simulator",
            cwd : "./simulator",
            script: "node",
            args: "./server/index",
            env: { "NODE_ENV": "production" }
          },
          {
            name   : "common",
            cwd : "./common",
            script: "node",
            args: "./server/index",
            env: { "NODE_ENV": "production" }
          },
          {
            name   : "designer",
            cwd : "./designer",
            script: "node",
            args: "./server/index",
            env: { "NODE_ENV": "production" }
          },
          {
            name   : "home",
            cwd : "./home",
            script: "node",
            args: "./server/index",
            env: { "NODE_ENV": "production" }
          },
          {
            name   : "database",
            cwd : "./database",
            script: "node",
            args: "./server/index",
            env: { "NODE_ENV": "production" }
          },
          {
            name   : "ingress",
            cwd : "./ingress",
            script: "node",
            args: "./server/index",
            env: { "NODE_ENV": "production" }
          },
          {
            name   : "permissions",
            cwd : "./permissions",
            script: "node",
            args: "./server/index",
            env: { "NODE_ENV": "production" }
          },
          {
            name   : "shapes",
            cwd : "./shapes",
            script: "node",
            args: "./server/index",
            env: { "NODE_ENV": "production" }
          },
          {
            name   : "sheets",
            cwd : "./sheets",
            script: "node",
            args: "./server/index",
            env: { "NODE_ENV": "production" }
          },
          {
            name   : "userinfo",
            cwd : "./userinfo",
            script: "node",
            args: "./server/index",
            env: { "NODE_ENV": "production" }
          }
    ]
}
