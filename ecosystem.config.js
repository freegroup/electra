module.exports = {
    apps : [
          {
            name   : "legal",
            cwd : "./legal",
            script: "node",
            args: "./server/index",
            env: { "NODE_ENV": "production"}
          },          
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
            env: { "NODE_ENV": "production"}
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
            name   : "gallery",
            cwd : "./gallery",
            script: "node",
            args: "./server/index",
            env: { "NODE_ENV": "production"}
          },          
          {
            name   : "gamification",
            cwd : "./gamification",
            script: "node",
            args: "./server/index",
            env: { "NODE_ENV": "production"}
          },          
          {
            name   : "ingress",
            cwd : "./ingress",
            script: "node",
            args: "./server/index",
            exec_mode : "cluster",
            env: { "NODE_ENV": "production"}
          },          
          {
            name   : "permissions",
            cwd : "./permissions",
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