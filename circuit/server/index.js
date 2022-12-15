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

const PORT = process.env.PORT_CIRCUIT || die("missing env variable PORT_CIRCUIT");
const HOST = "localhost";



// Create Express Server
const app = express();

app.use('/circuit', express.static(scriptPath+'/../public'));

// Start Proxy
app.listen(PORT, HOST, () => {
    console.log(`Starting /circuit at http://${HOST}:${PORT}`);
});
