const express = require('express');
const fs = require('fs');
const path = require('path');
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

const PORT = process.env.PORT_PERMISSIONS || die("missing env variable PORT_PERMISSIONS");

const app = express();

app.use(express.json());

// Helperfunktion zum Lesen von Dateien und Speichern in einer statischen Variablen
const readFileCache = (file, name, cache) => {
    fs.readFile(file, (err, data) => {
        // Speichern Sie die Berechtigungsdaten im JSON-Format in der statischen Variablen
        cache[name] = JSON.parse(data);
    });
}

// Statische Variablen zum Speichern der Berechtigungsdaten
const permissions = {};

// Lesen Sie die Berechtigungsdaten für alle Rollen beim Start der Anwendung und speichern Sie sie in der statischen Variablen
readFileCache(scriptPath+'/permissions-anonym.json', "anonym", permissions);
readFileCache(scriptPath+'/permissions-admin.json', "admin", permissions);
readFileCache(scriptPath+'/permissions-user.json', "user", permissions);

app.get('/permissions', (req, res) => {
    const role = req.headers['x-role'];
    console.log('role:', role);

    if (role === 'admin') {
        // Senden Sie die Berechtigungsdaten für die Rolle "admin" aus der statischen Variablen zurück
        console.log("return admin permissions")
        res.json(permissions['admin']);
    } else if (role === 'user') {
        // Senden Sie die Berechtigungsdaten für die Rolle "user" aus der statischen Variablen zurück
        console.log("return user permissions")
        res.json(permissions['user']);
    } else {
        // Senden Sie die Berechtigungsdaten für die anonyme Rolle aus der statischen Variablen zurück
        console.log("return anonymous permissions")
        res.json(permissions['anonym']);
    }
});

app.listen(PORT, () => {
    console.log('Permissions Server up and running on port', PORT);
});
