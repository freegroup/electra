const express = require('express');
const morgan = require("morgan");
const path = require('path')
const dotenv = require('dotenv')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const {OAuth2Client} = require('google-auth-library');

const { createProxyMiddleware } = require('http-proxy-middleware');

const PROJECT_PATH = path.resolve(__dirname+ "/../..")
const componentPath = path.resolve(__dirname+ "/..")
const componentName = path.basename(componentPath)
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
const http = require('http').Server(app)


// Configuration
const HOST = "localhost";
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

const API_SERVICE_URL = "http://localhost";

function onProxyReq(proxyReq, req, res){
    const session = req.session
    if (session.idToken){
        console.log("Found user in session: "+session.email);
        proxyReq.setHeader("x-mail", session.email
        );
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
const io = require('./websocket').connect(http, {path: '/socket.io'})


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
app.use('/oauth/callback', async function(req, res) {
    console.log(req.cookies)
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
    console.log(req.session);
    return res.redirect(302, `${process.env.BASE_URL}/home/`);
});


// Start Proxy
http.listen(PORT, () => {
    console.log(`Starting Ingress at http://${HOST}:${PORT}`);
});
