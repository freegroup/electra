const express = require('express');
const path = require('path')
const dotenv = require('dotenv')

const PROJECT_PATH = path.resolve(__dirname+ "/../..")
const scriptPath = path.dirname(__filename);

dotenv.config({ 
    debug: false,
    path: PROJECT_PATH+'/settings.ini' 
})

function die(msg){
    console.log(msg)
    process.exit(1)
}

const PORT = process.env.PORT_AUTHOR || die("missing env variable PORT_AUTHOR");
const HOST = "localhost";


// Create Express Server
const app = express();

app.use('/author', express.static(scriptPath+'/../public'));

// Start Server
// "localhost" => Service ist nicht von ausserhalb aufrufbar.
// Wichtig, da der Server eine public IP hat und man sonst diesen Server auch ohne den Ingress aufrufen könnte.
// Andere Lösung wäre "private network" + Loadbalancer. Die zusätzliche Infrastrcutur kostet aber wieder mehr.
app.listen(PORT, "localhost", () => {
    console.log(`Starting /author at http://localhost:${PORT}/author`);
});
