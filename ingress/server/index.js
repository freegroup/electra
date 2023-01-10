const express = require('express');
const morgan = require("morgan");
const path = require('path')
const fs = require('fs');
const dotenv = require('dotenv')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const {OAuth2Client} = require('google-auth-library');

const { createProxyMiddleware } = require('http-proxy-middleware');

const PROJECT_PATH = path.resolve(__dirname+ "/../..")
const componentPath = path.resolve(__dirname+ "/..")
const componentName = path.basename(componentPath)
const scriptPath = path.dirname(__filename);
const oneDay = 1000 * 60 * 60 * 24;
const envFile = PROJECT_PATH+'/settings.ini' 

console.log(`Component '${componentName} is loading envFile '${envFile}'`)
dotenv.config({ debug: false,path: envFile })


function die(msg){
    console.log(msg)
    process.exit(1)
}


// Create Express Server
const app = express();


// Configuration
const PORT = process.env.PORT_INGRESS || die("missing env variable PORT_INGRESS");
const PORT_COMMON = process.env.PORT_COMMON || die("missing env variable PORT_COMMON");
const PORT_HOME = process.env.PORT_HOME || die("missing env variable PORT_HOME");
const PORT_PERMISSIONS = process.env.PORT_PERMISSIONS || die("missing env variable PORT_PERMISSIONS");
const PORT_CIRCUIT = process.env.PORT_CIRCUIT || die("missing env variable PORT_CIRCUIT");
const PORT_SHAPES = process.env.PORT_SHAPES || die("missing env variable PORT_SHAPES");
const PORT_BRAINS = process.env.PORT_BRAINS || die("missing env variable PORT_BRAINS");
const PORT_USERINFO = process.env.PORT_USERINFO || die("missing env variable PORT_USERINFO");
const PORT_AUTHOR = process.env.PORT_AUTHOR || die("missing env variable PORT_AUTHOR");
const PORT_SHEETS = process.env.PORT_SHEETS || die("missing env variable PORT_SHEETS");
const PORT_DESIGNER = process.env.PORT_DESIGNER || die("missing env variable PORT_DESIGNER");
const LOCALHOST = process.env.LOCALHOST || die("missing env variable LOCALHOST");

const API_SERVICE_URL = "http://"+LOCALHOST;

function ensureLocalhost(req, res, next) {
	var remote = req.ip || req.connection.remoteAddress
	console.log("in islocal")
	if ((remote === '::1') || (remote === 'localhost'))
		return next();
	else 
		return next('route'); //call next /test route to handle check on authentication.
}

function onProxyReq(proxyReq, req, res){
    const session = req.session
    if (session.idToken){
        console.log("Found user in session: "+session.email);
        proxyReq.setHeader("x-mail", session.email);
        proxyReq.setHeader("x-picture", session.picture);
        proxyReq.setHeader("x-name", session.name);
        proxyReq.setHeader("x-family_name", session.familyName);
        proxyReq.setHeader("x-given_name", session.givenName);
        proxyReq.setHeader("x-role", session.email==="openjacob@gmail.com"?"admin":"user");
    }
    else {
        console.log("No user in session: ")
        proxyReq.setHeader("x-mail", 'Guest');
        proxyReq.setHeader("x-name", 'Guest');
        proxyReq.setHeader("x-family_name", 'Guest');
        proxyReq.setHeader("x-given_name", 'Guest');
        proxyReq.setHeader("x-role", "anonym");
    }
}


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(session({
    secret: "puYXMGlyQpO9+9gtiZAgObKEEnmU4WNGcTpMkUey",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));
app.get('/', function(req, res) {
    res.redirect('/home');
});


// redirect to a non-www domain
// https://www.electra.academy => https://electra.academy
//
app.get ('/*', function (req, res, next){
  if (req.headers.host.match(/^www\./) ) {
    res.redirect( '//' + req.headers.host.substring(4) + req.url)
  }
  else {
    next()
  }
});

// Required for the ACME-Challenge of LetsEncrypt
//
app.use('/.well-known/acme-challenge', express.static(scriptPath+'/../public/.well-known/acme-challenge'));

app.use('/home', createProxyMiddleware({
    target: API_SERVICE_URL+":"+PORT_HOME,
    changeOrigin: true,
    pathRewrite: {},
    onProxyReq: onProxyReq
}));

app.use('/userinfo', createProxyMiddleware({
    target: API_SERVICE_URL+":"+PORT_USERINFO,
    changeOrigin: true,
    pathRewrite: {},
    onProxyReq: onProxyReq
}));

app.use('/designer', createProxyMiddleware({
    target: API_SERVICE_URL+":"+PORT_DESIGNER,
    changeOrigin: true,
    pathRewrite: {},
    onProxyReq: onProxyReq
}));

app.use('/author', createProxyMiddleware({
    target: API_SERVICE_URL+":"+PORT_AUTHOR,
    changeOrigin: true,
    pathRewrite: {},
    onProxyReq: onProxyReq
}));

app.use('/sheets', createProxyMiddleware({
    target: API_SERVICE_URL+":"+PORT_SHEETS,
    changeOrigin: true,
    pathRewrite: {},
    onProxyReq: onProxyReq
}));

app.use('/brains', createProxyMiddleware({
    target: API_SERVICE_URL+":"+PORT_BRAINS,
    changeOrigin: true,
    pathRewrite: {},
    onProxyReq: onProxyReq
}));

app.use('/shapes', createProxyMiddleware({
    target: API_SERVICE_URL+":"+PORT_SHAPES,
    changeOrigin: true,
    pathRewrite: {},
    onProxyReq: onProxyReq
}));

app.use('/circuit', createProxyMiddleware({
    target: API_SERVICE_URL+":"+PORT_CIRCUIT,
    changeOrigin: true,
    pathRewrite: {},
    onProxyReq: onProxyReq
}));

app.use('/common', createProxyMiddleware({
    target: API_SERVICE_URL+":"+PORT_COMMON,
    changeOrigin: true,
    pathRewrite: {},
    onProxyReq: onProxyReq
}));

// Proxy endpoints
app.use('/permissions', createProxyMiddleware({
    target: API_SERVICE_URL+":"+PORT_PERMISSIONS,
    changeOrigin: true,
    pathRewrite: {},
    onProxyReq: onProxyReq
}));

// Google auth endpoints
app.use('/oauth/callback/:componentUri', async function(req, res) {
    const csrfTokenCookie = req.cookies['g_csrf_token'];
    if (!csrfTokenCookie) {
      return res.status(400).send('No CSRF token in Cookie.');
    }
    const csrfTokenBody = req.body.g_csrf_token;
    if (!csrfTokenBody) {
      return res.status(400).send('No CSRF token in post body.');
    }
    if (csrfTokenCookie !== csrfTokenBody) {
      return res.status(400).send('Failed to verify double submit cookie.');
    }
    const token = req.body.credential;
    const clientId = req.body.clientid;
    const client = new OAuth2Client(clientId);
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: clientId
    })


    const payload = ticket.getPayload();
    req.session.idToken = token;
    req.session.email = payload.email;
    req.session.picture = payload.picture;
    req.session.name = payload.name;
    req.session.familyName = payload.family_name;
    req.session.givenName = payload.given_name;
    return res.redirect(`${req.protocol}://${req.headers.host}/${req.params.componentUri}/`);
});

//then, after all proxys
app.use(bodyParser.json());

// Start Proxy
try {
    const http = require('http').Server(app)
    const io = require('./websocket').connect(http, {path: '/socket.io'})


    io.on("connection", (socket) => {
        console.log("CONNECTED.....")
        // send a message to the client
        socket.emit("hello from server", 1, "2", { 3: Buffer.from([4]) });
    
        // receive a message from the client
        socket.on("hello from client", (...args) => {
        // ...
        });
    });

    app.use('/broadcast', ensureLocalhost, function( req, res){
        const topic = req.body.topic
        const event = req.body.event
        console.log(req.body)
        console.log("socket.emit...")
        io.sockets.emit(topic, event)
        res.send("success")
    });
    
    http.listen(PORT, () => {
        console.log(`Starting Ingress at http://localhost:${PORT}`);
    });
}
catch(exc){
    console.log("failed to start 'http' server")
    console.log(exc)
}

// Start Proxy
try{
    var privateKey  = fs.readFileSync(process.env.SSL_KEY, 'utf8');
    var certificate = fs.readFileSync(process.env.SSL_CERT, 'utf8');
    var credentials = {key: privateKey, cert: certificate};
    const https = require('https').Server(credentials, app);
    const io = require('./websocket').connect(https, {path: '/socket.io'})
    https.listen(8443, () => {
        console.log(`Starting Ingress at http://localhost:8443`);
    });
}
catch(exc){
    console.log("failed to start https server")
    console.log(exc)
}