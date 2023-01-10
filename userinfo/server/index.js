const express = require('express');
const path = require('path')
const dotenv = require('dotenv')

const PROJECT_PATH = path.resolve(__dirname+ "/../..")
const componentPath = path.resolve(__dirname+ "/..")
const componentName = path.basename(componentPath)
const envFile = PROJECT_PATH+'/settings.ini' 

console.log(`Component '${componentName} is loading envFile '${envFile}'`)
dotenv.config({ debug: false,path: envFile })


function die(msg){
    console.log(msg)
    process.exit(1)
}


const app = express();
const PORT = process.env.PORT_USERINFO || die("missing env variable PORT_USERINFO");
const LOCALHOST = process.env.LOCALHOST || die("missing env variable LOCALHOST");


app.get('*', (req, res) => {
  const role = req.headers['x-role'];

  console.log(role);
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
});

app.listen(PORT, LOCALHOST, () => {
  console.log(`Starting /userinfo on http://${LOCALHOST}:${PORT}`);
});
