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
            name   : "frontend-author",
            cwd : "./frontend/author",
            script: "node",
            args: "./server/index",
            env: { "NODE_ENV": "production" }
          },
          {
            name   : "backend-brains",
            cwd : "./backend/brains",
            script: "node",
            args: "./server/index",
            env: {
              "NODE_ENV": "production",
              "BRAINS_PERSISTENCE": "database"
            }
          },
          {
            name   : "frontend-simulator",
            cwd : "./frontend/simulator",
            script: "node",
            args: "./server/index",
            env: { "NODE_ENV": "production" }
          },
          {
            name   : "frontend-common",
            cwd : "./frontend/common",
            script: "node",
            args: "./server/index",
            env: { "NODE_ENV": "production" }
          },
          {
            name   : "frontend-book",
            cwd : "./frontend/book_html",
            script: "node",
            args: "./server/index",
            env: { "NODE_ENV": "production"}
          },
          {
            name   : "frontend-gallery",
            cwd : "./frontend/gallery",
            script: "node",
            args: "./server/index",
            env: { "NODE_ENV": "production" }
          },
          {
            name   : "frontend-designer",
            cwd : "./frontend/designer",
            script: "node",
            args: "./server/index",
            env: { "NODE_ENV": "production" }
          },
          {
            name   : "frontend-home",
            cwd : "./frontend/home",
            script: "node",
            args: "./server/index",
            env: { "NODE_ENV": "production" }
          },
          {
            name   : "backend-database",
            cwd : "./backend/database",
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
            name   : "backend-shapes",
            cwd : "./backend/shapes",
            script: "node",
            args: "./server/index",
            env: { "NODE_ENV": "production" }
          },
          {
            name   : "backend-sheets",
            cwd : "./backend/sheets",
            script: "node",
            args: "./server/index",
            env: { "NODE_ENV": "production" }
          },
          {
            name   : "backend-userinfo",
            cwd : "./backend/userinfo",
            script: "node",
            args: "./server/index",
            env: { "NODE_ENV": "production" }
          }
    ]
}
