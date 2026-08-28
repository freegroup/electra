module.exports = {
    apps : [          
          {
            name   : "frontend-author",
            cwd : "./frontend/author",
            script: "node",
            args: "./server/index",
            env: { "NODE_ENV": "production",}
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
            env: { "NODE_ENV": "production",}
          },          
          {
            name   : "frontend-common",
            cwd : "./frontend/common",
            script: "node",
            args: "./server/index",
            env: { "NODE_ENV": "production"}
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
            env: { "NODE_ENV": "production"}
          },
          {
            name   : "frontend-designer",
            cwd : "./frontend/designer",
            script: "node",
            args: "./server/index",
            env: { "NODE_ENV": "production"}
          },          
          {
            name   : "frontend-home",
            cwd : "./frontend/home",
            script: "node",
            args: "./server/index",
            env: { "NODE_ENV": "production"}
          },
          {
            name   : "backend-database",
            cwd : "./backend/database",
            script: "node",
            args: "./server/index",
            env: { "NODE_ENV": "production"}
          },
          {
            // Localhost-only admin/testing explorer. Deliberately NOT proxied
            // by the ingress — reach it via localhost or an SSH tunnel.
            name   : "backend-database-admin",
            cwd : "./backend/database/admin",
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
            name   : "backend-shapes",
            cwd : "./backend/shapes",
            script: "node",
            args: "./server/index",
            env: { "NODE_ENV": "production"}
          },          
          {
            name   : "backend-sheets",
            cwd : "./backend/sheets",
            script: "node",
            args: "./server/index",
            env: { "NODE_ENV": "production"}
          },          
          {
            name   : "backend-userinfo",
            cwd : "./backend/userinfo",
            script: "node",
            args: "./server/index",
            env: { "NODE_ENV": "production"}
          }
    ]
  }