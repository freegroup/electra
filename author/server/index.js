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

// Start Proxy
app.listen(PORT, HOST, () => {
    console.log(`Starting /author at http://${HOST}:${PORT}/author`);
});
