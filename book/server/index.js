const express = require('express');
const path = require("path")
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

const PORT = process.env.PORT_BOOK || die("missing env variable PORT_BOOK");
const LOCALHOST = process.env.LOCALHOST || die("missing env variable LOCALHOST");

// Create Express Server
const app = express();

// Static only. Every page under public/book/ is a finished HTML file
// written by tools/convert-book.js - there is nothing to render at request
// time, which is also what keeps the text in the source for a crawler.
//
// The ingress re-prepends the mount prefix before forwarding, so the service
// sees /book/... and mounts there.
app.use('/book', express.static(scriptPath+'/../public'));

// Start Server
// "localhost" => Service ist nicht von ausserhalb aufrufbar.
app.listen(PORT, LOCALHOST, () => {
    console.log(`Starting /book at http://${LOCALHOST}:${PORT}`);
});
