const express = require('express');
const path = require('path')
const dotenv = require('dotenv')

const PROJECT_PATH = path.resolve(__dirname+ "/../..")
const componentPath = path.resolve(__dirname+ "/..")
const componentName = path.basename(componentPath)
const scriptPath = path.dirname(__filename);
const envFile = PROJECT_PATH+'/settings.ini' 

console.log("loading envFile: "+envFile)
dotenv.config({ debug: false,path: envFile })

function die(msg){
    console.log(msg)
    process.exit(1)
}

const PORT = process.env.PORT_AUTHOR || die("missing env variable PORT_AUTHOR");
const LOCALHOST = process.env.LOCALHOST || die("missing env variable PORT_AUTHOR");
let DATADIR_I18N =  process.env.DATADIR_I18N ||  die("Environment Varialbe DATADIR_I18N missing")
DATADIR_I18N = path.normalize(`${PROJECT_PATH}/${DATADIR_I18N}`)


// Create Express Server
const app = express();

app.use('/author', express.static(scriptPath+'/../public'));

// Start Server
// "localhost" => Service ist nicht von ausserhalb aufrufbar.
// Wichtig, da der Server eine public IP hat und man sonst diesen Server auch ohne den Ingress aufrufen könnte.
// Andere Lösung wäre "private network" + Loadbalancer. Die zusätzliche Infrastrcutur kostet aber wieder mehr.
app.listen(PORT, LOCALHOST, () => {
    console.log(`Starting /author at http://${LOCALHOST}:${PORT}/author`);
});
