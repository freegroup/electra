const express = require('express');
const path = require('path')
const dotenv = require('dotenv')

const PROJECT_PATH = path.resolve(__dirname+ "/../..")
const componentPath = path.resolve(__dirname+ "/..")
const componentName = path.basename(componentPath)
const scriptPath = path.dirname(__filename);
const envFile = PROJECT_PATH+'/settings.ini' 

console.log(`Component '${componentName} is loading envFile '${envFile}'`)
dotenv.config({ debug: false,path: envFile })


function die(msg){
    console.log(msg)
    process.exit(1)
}

const PORT = process.env.PORT_SIMULATOR || die("missing env variable PORT_SIMULATOR");
const LOCALHOST = process.env.LOCALHOST || die("missing env variable LOCALHOST");


// Create Express Server
const app = express();

// Canonical trailing slash. index.html uses paths relative to a trailing slash
// (./images/…, ./js/…) and the Google OAuth redirect_uri is derived from
// window.location.pathname — both break when the app is reached as "/simulator"
// instead of "/simulator/". express.static only auto-redirects for real
// subdirectories, not for the mount root, so we handle the bare mount here.
// The app owns this rule; the ingress stays a dumb proxy.
app.get('/simulator', (req, res, next) => {
    if (req.path.endsWith('/')) return next()
    const query = req.originalUrl.slice(req.path.length) // preserve ?…
    res.redirect(301, req.path + '/' + query)
})

app.use('/simulator', express.static(scriptPath+'/../public'));

// Start Server
// "localhost" => Service ist nicht von ausserhalb aufrufbar.
// Wichtig, da der Server eine public IP hat und man sonst diesen Server auch ohne den Ingress aufrufen könnte.
// Andere Lösung wäre "private network" + Loadbalancer. Die zusätzliche Infrastrcutur kostet aber wieder mehr.
app.listen(PORT, LOCALHOST, () => {
    console.log(`Starting /simulator at http://${LOCALHOST}:${PORT}`);
});
