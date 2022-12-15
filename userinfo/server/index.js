var http = require('http');

const PORT = 3000;
const HOST = "localhost";

var app = http.createServer(function(req,res){
    role = req.headers['x-role']   

    console.log(role)
    if (role === "anonym" || role===undefined) {
        res.statusCode = 403;
        res.end('user not logged in');
        return
    }
 
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
        "id": req.headers['x-mail'],
        "picture": req.headers['x-picture'],
        "username": req.headers['x-name'],
        "email": req.headers['x-mail'],
        "displayName": req.headers['x-name'],
        "role": role
    }, null, 3));
});

// Start Proxy
app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
});
