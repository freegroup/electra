module.exports = {
    apps : [          
          {
            name   : "author",
            cwd : "./author",
            script: "node",
            args: "./server/index",
            env: { "NODE_ENV": "production",}
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
            env: { "NODE_ENV": "production",}
          },          
          {
            name   : "common",
            cwd : "./common",
            script: "node",
            args: "./server/index",
            env: { "NODE_ENV": "production"}
          },          
          {
            name   : "book",
            cwd : "./book",
            script: "node",
            args: "./server/index",
            env: { "NODE_ENV": "production"}
          },
          {
            name   : "designer",
            cwd : "./designer",
            script: "node",
            args: "./server/index",
            env: { "NODE_ENV": "production"}
          },          
          {
            name   : "home",
            cwd : "./home",
            script: "node",
            args: "./server/index",
            env: { "NODE_ENV": "production"}
          },
          {
            name   : "database",
            cwd : "./database",
            script: "node",
            args: "./server/index",
            env: { "NODE_ENV": "production"}
          },
          {
            // Localhost-only admin/testing explorer. Deliberately NOT proxied
            // by the ingress — reach it via localhost or an SSH tunnel.
            name   : "database-admin",
            cwd : "./database/admin",
            script: "node",
            args: "./server/index",
            env: { "NODE_ENV": "production"}
          },
          {
            name   : "ingress",
            cwd : "./ingress",
            script: "node",
            args: "./server/index",
            env: { "NODE_ENV": "production"}
          },
          {
            name   : "shapes",
            cwd : "./shapes",
            script: "node",
            args: "./server/index",
            env: { "NODE_ENV": "production"}
          },          
          {
            name   : "sheets",
            cwd : "./sheets",
            script: "node",
            args: "./server/index",
            env: { "NODE_ENV": "production"}
          },          
          {
            name   : "userinfo",
            cwd : "./userinfo",
            script: "node",
            args: "./server/index",
            env: { "NODE_ENV": "production"}
          }
    ]
  }