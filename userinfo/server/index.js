const express = require('express');
const path = require('path')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')

const PROJECT_PATH = path.resolve(__dirname+ "/../..")
const componentPath = path.resolve(__dirname+ "/..")
const componentName = path.basename(componentPath)
const envFile = PROJECT_PATH+'/settings.ini'

console.log(`Component '${componentName} is loading envFile '${envFile}'`)
dotenv.config({ debug: false,path: envFile })

const die = require("./die")
const db = require("./db")
const conf = require("./configuration")
const workspaces = require("./workspaces")
const review = require("./review")

const app = express();
const PORT = process.env.PORT_USERINFO || die("missing env variable PORT_USERINFO");
const LOCALHOST = process.env.LOCALHOST || die("missing env variable LOCALHOST");

db.init(conf)

app.use(bodyParser.json({ limit: '5mb' }))

// Account-scoped data (dynamic, per-user) is never cached.
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate")
  res.set("Pragma", "no-cache")
  res.set("Expires", "0")
  next()
})

// The profile — the original userinfo response. Kept at the exact mount path so
// the existing frontend caller (Userinfo.js does axios.get("../userinfo"))
// keeps working. Must be registered before the app-crossing feature routes.
function sendProfile(req, res) {
  const role = req.headers['x-role'];
  if (role === 'anonym' || role === undefined) {
    res.status(403).send('user not logged in');
    return;
  }
  res.json({
    id: req.headers['x-mail'],
    picture: req.headers['x-picture'],
    username: req.headers['x-name'],
    email: req.headers['x-mail'],
    displayName: req.headers['x-name'],
    role: role
  });
}
app.get('/userinfo', sendProfile)
app.get('/userinfo/', sendProfile)

// Account-scoped features (app-agnostic), fronting the internal database service.
workspaces.init(app)
review.init(app)

app.listen(PORT, LOCALHOST, () => {
  console.log(`Starting /userinfo on http://${LOCALHOST}:${PORT}`);
});
