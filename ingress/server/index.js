const express = require('express');
const path = require('path')
const fs = require('fs');
const crypto = require('crypto');
const dotenv = require('dotenv')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const helmet = require("helmet");

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


//app.use(helmet.contentSecurityPolicy());
//app.use(helmet.crossOriginEmbedderPolicy({ policy:'require-corp' }));
app.use(helmet.crossOriginOpenerPolicy());
app.use(helmet.crossOriginResourcePolicy({policy: 'cross-origin'}));
app.use(helmet.dnsPrefetchControl());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.originAgentCluster());
app.use(helmet.permittedCrossDomainPolicies());
// Google's GSI button endpoint refuses (400) when the browser sends no
// referrer at all — it needs at least the origin to validate the
// authorized-JavaScript-origins allow-list of the OAuth client. helmet's
// default is 'no-referrer', which breaks this. Use the OWASP-recommended
// value that still hides the path but keeps the origin visible.
app.use(helmet.referrerPolicy({ policy: 'strict-origin-when-cross-origin' }));
app.use(helmet.xssFilter());


// Configuration
const PORT = process.env.PORT_INGRESS || die("missing env variable PORT_INGRESS");
const PORT_COMMON = process.env.PORT_COMMON || die("missing env variable PORT_COMMON");
const PORT_HOME = process.env.PORT_HOME || die("missing env variable PORT_HOME");
const PORT_PERMISSIONS = process.env.PORT_PERMISSIONS || die("missing env variable PORT_PERMISSIONS");
const PORT_SIMULATOR = process.env.PORT_SIMULATOR || die("missing env variable PORT_SIMULATOR");
const PORT_SHAPES = process.env.PORT_SHAPES || die("missing env variable PORT_SHAPES");
const PORT_BRAINS = process.env.PORT_BRAINS || die("missing env variable PORT_BRAINS");
const PORT_USERINFO = process.env.PORT_USERINFO || die("missing env variable PORT_USERINFO");
const PORT_AUTHOR = process.env.PORT_AUTHOR || die("missing env variable PORT_AUTHOR");
const PORT_SHEETS = process.env.PORT_SHEETS || die("missing env variable PORT_SHEETS");
const PORT_DESIGNER = process.env.PORT_DESIGNER || die("missing env variable PORT_DESIGNER");
const LOCALHOST = process.env.LOCALHOST || die("missing env variable LOCALHOST");

// The OAuth client this deployment accepts tokens for. NOT a secret - it is
// public by design and also sits in the frontend (common/js/Userinfo.js), which
// must use the SAME value. It lives in config rather than in the request
// because it is what the token gets checked AGAINST; see the callback below.
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || die("missing env variable GOOGLE_CLIENT_ID");

// Whoever signs in with this address gets the "admin" role. A single address
// for now; unset means nobody is admin, which is the safe direction to fail in.
// This is only the platform-wide role - per-scope admin rights are membership
// data in the document store and have nothing to do with this.
const ADMIN_MAIL = process.env.ADMIN_MAIL || "";

// Signs the session cookie. Left unset it is regenerated on every start, which
// simply logs everyone out on restart - no worse than today, because sessions
// live in express-session's in-memory store and die with the process anyway.
// Set it in secrets.ini only once sessions outlive a restart (shared store,
// more than one ingress instance).
const SESSION_SECRET = process.env.SESSION_SECRET || crypto.randomBytes(32).toString("hex");

// Platform-wide role of a signed-in user. The one place that decides it.
function roleOf(email){
    return (ADMIN_MAIL && email === ADMIN_MAIL) ? "admin" : "user";
}

const API_SERVICE_URL = "http://"+LOCALHOST;

// Backends that want a heads-up when a user logs in. Each hook receives the
// user's identity headers (x-mail/x-role) and resolves the person itself — the
// ingress never hashes. Fire-and-forget: login must never block on these.
// Add more backends here as one-liners.
const ON_LOGIN_HOOKS = [
    { url: `${API_SERVICE_URL}:${process.env.PORT_DATABASE}/database/on_login` },
];

function fireOnLogin(session){
    const role = roleOf(session.email);
    for (const hook of ON_LOGIN_HOOKS) {
        fetch(hook.url, {
            method: "POST",
            headers: { "x-mail": session.email, "x-role": role },
        }).catch(err => console.log(`on_login hook failed for ${hook.url}:`, err.message));
    }
}

let sessionMiddleware = session({
    secret: SESSION_SECRET,
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
})

// convert a connect middleware to a Socket.IO middleware
const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);

function ensureLocalhost(req, res, next) {
	var remote = req.ip || req.connection.remoteAddress
	console.log("in islocal")
	if ((remote === '::1') || (remote === 'localhost'))
		return next();
	else 
		return next('route'); //call next /test route to handle check on authentication.
}

function onProxyRes(proxyRes, req, res) {
    const cookies = proxyRes.headers['set-cookie'];
    if (cookies) {
        res.setHeader('set-cookie', cookies);
    }

    console.log('Incoming response headers from target:', proxyRes.headers);
}

let browserId = 42;
function onProxyReq(proxyReq, req, res){
    console.log("Proxying request...");
    console.log("Method:", req.method);
    console.log("URL:", req.url);
    console.log("Headers:", req.headers);

    console.log("Proxy Request Debugging:");
    console.log("X-Debug-Protocol:", req.headers['x-debug-protocol']);
    console.log("X-Debug-Host:", req.headers['x-debug-host']);
    console.log("X-Debug-Port:", req.headers['x-debug-port']);

    const session = req.session
    session.browserId ??= (browserId++)

    if (session.idToken){
        proxyReq.setHeader("x-mail", session.email);
        proxyReq.setHeader("x-picture", session.picture);
        proxyReq.setHeader("x-name", session.name);
        proxyReq.setHeader("x-family_name", session.familyName);
        proxyReq.setHeader("x-given_name", session.givenName);
        proxyReq.setHeader("x-role", roleOf(session.email));
    }
    else {
        proxyReq.setHeader("x-mail", 'Guest');
        proxyReq.setHeader("x-name", 'Guest');
        proxyReq.setHeader("x-family_name", 'Guest');
        proxyReq.setHeader("x-given_name", 'Guest');
        proxyReq.setHeader("x-role", "anonym");
    }
}

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(sessionMiddleware);


// redirect to a non-www domain
// https://www.electra.academy => https://electra.academy
//
app.use(function (req, res, next){
  if (req.headers.host && req.headers.host.match(/^www\./) ) {
    res.redirect( '//' + req.headers.host.substring(4) + req.url)
  }
  else {
    next()
  }
});

// Required for the ACME-Challenge of LetsEncrypt
//
app.use('/.well-known/acme-challenge', express.static(scriptPath+'/../public/.well-known/acme-challenge'));


// Express 5 strips the mount prefix from req.url before the handler runs, so
// app.use('/mount', proxy) forwards '/' instead of '/mount/...'. Downstream
// services mount their routes under /brains, /database, ... and need the full
// path, so we re-prepend the mount prefix via pathRewrite.
function prefixed(mount, port) {
    return createProxyMiddleware({
        target: API_SERVICE_URL + ":" + port,
        changeOrigin: true,
        pathRewrite: (path) => mount + path,
        on: { proxyReq: onProxyReq }
    })
}

// Canonical trailing slash for top-level document navigations. A frontend app
// reached as "/simulator" (no slash) makes the browser resolve the page's
// relative asset paths (./images/…, ./js/…) against the PARENT, and it derives
// the Google OAuth redirect_uri from window.location.pathname — both need the
// trailing slash. The proxy is the only place that sees the ORIGINAL browser
// URL (pathRewrite later appends the slash before forwarding, hiding it from
// the backend), so the redirect has to live here.
//
// This is generic proxy behaviour, not app knowledge: redirect a bare
// single-segment path (no dot, no deeper path) ONLY when the browser is
// navigating to it as a top-level document (Sec-Fetch-Dest: document). Every
// modern browser sets that header on page loads; API/XHR calls (fetch → the
// single-segment /permissions, /userinfo, and all deeper paths) carry a
// non-document value, and a missing header (non-browser client) is left alone
// too — redirecting an XHR/POST could degrade it to GET.
app.use((req, res, next) => {
    const isDocument = req.headers['sec-fetch-dest'] === 'document'
    const bareMount = /^\/[^/.]+$/.test(req.path) // "/simulator", not "/a/b" or "/x.js"
    if (isDocument && bareMount) {
        const query = req.originalUrl.slice(req.path.length) // preserve ?…
        return res.redirect(301, req.path + '/' + query)
    }
    next()
})

app.use('/home',         prefixed('/home',         PORT_HOME))
app.use('/userinfo',     prefixed('/userinfo',     PORT_USERINFO))
app.use('/designer',     prefixed('/designer',     PORT_DESIGNER))
app.use('/author',       prefixed('/author',       PORT_AUTHOR))
app.use('/sheets',       prefixed('/sheets',       PORT_SHEETS))
app.use('/brains',       prefixed('/brains',       PORT_BRAINS))
// NOTE: the `database` service is intentionally NOT proxied here. It is the
// internal, localhost-only scope/document store. Browser callers reach it only
// through app backends (brains/sheets front their own docs, incl. public-read
// and render-token) and the userinfo account BFF (/userinfo/workspaces). The
// database admin explorer (database/admin, PORT_DB_ADMIN) is likewise not
// exposed. Reach either via localhost or an SSH tunnel.
app.use('/shapes',       prefixed('/shapes',       PORT_SHAPES))
app.use('/simulator',    prefixed('/simulator',    PORT_SIMULATOR))
app.use('/common',       prefixed('/common',       PORT_COMMON))
app.use('/permissions',  prefixed('/permissions',  PORT_PERMISSIONS))



// Google auth endpoints

// What a browser needs to know in order to start a sign-in. Public by
// definition - it is handed to anonymous visitors, who are exactly the ones who
// still have to log in. Served here because the ingress is the component that
// verifies tokens against this client id (see the callback below), so the value
// exists in exactly one place and the frontend can never drift out of sync.
//
// Hand-written response object, deliberately: never spread process.env or a
// config blob in here, or the first secret that lands in settings.ini leaks the
// day someone adds it.
app.get('/auth/configuration', function(req, res) {
    res.json({ googleClientId: GOOGLE_CLIENT_ID })
})

app.use('/oauth/callback{/:componentUri}', async function(req, res) {
    try {
        console.log("authenticate called..")
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
        const token = req.body.credential
        // The audience MUST come from our own configuration, never from the
        // request. Taking it from req.body.clientid meant the token named the
        // client id it was then checked against - the check closed a circle and
        // could not fail, so a valid Google token minted for ANY other OAuth
        // client was accepted here as a login. Pinning it to GOOGLE_CLIENT_ID
        // means only tokens actually issued for this deployment pass.
        const client = new OAuth2Client(GOOGLE_CLIENT_ID)
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: GOOGLE_CLIENT_ID
        })

        const payload = ticket.getPayload()
        const componentUri = req.params.componentUri ?? ""
        req.session.idToken = token
        req.session.email = payload.email
        req.session.picture = payload.picture
        req.session.name = payload.name
        req.session.familyName = payload.family_name
        req.session.givenName = payload.given_name
        // Notify backends (database, …) so the user is enrolled into bootstrap
        // scopes. Fire-and-forget — never block the redirect on it.
        fireOnLogin(req.session)
        // componentUri may be empty (login from the home page) — redirect to
        // the site root in that case, not to '//'.
        const target = componentUri ? `/${componentUri}/` : "/"
        return res.redirect(`${req.protocol}://${req.headers.host}${target}`)
    }
    catch( error ){
        console.log(error)
        return res.status(400).send('Failed to verify token')
    }
})


app.use('/', createProxyMiddleware({
    target: API_SERVICE_URL+":"+PORT_HOME,
    changeOrigin: true,
    pathRewrite: {},
    on: { proxyReq: onProxyReq }
}))

//then, after all proxys
app.use(bodyParser.json());


// Start Proxy
try {
    const http = require('http').Server(app)
    const io = require('./websocket').connect(http, {path: '/socket.io'})

    io.use(wrap(sessionMiddleware));

    io.on("connection", (socket) => {
        if(socket.request.session.browserId){
            console.log("Join to room:", socket.request.session.browserId)
            socket.join(socket.request.session.browserId);
        }

        // receive a message from the client
        socket.on("i18n", locale => {
            console.log("send to room", socket.request.session.browserId, locale)
            io.to(socket.request.session.browserId).emit("i18n", locale);
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
    io.use(wrap(sessionMiddleware));

    io.on("connection", (socket) => {
        if(socket.request.session.browserId){
            console.log("Join to room:", socket.request.session.browserId)
            socket.join(socket.request.session.browserId);
        }

        // receive a message from the client
        socket.on("i18n", locale => {
            console.log("send to room", socket.request.session.browserId, locale)
            io.to(socket.request.session.browserId).emit("i18n", locale);
        });
    });
    
    https.listen(8443, () => {
        console.log(`Starting Ingress at http://localhost:8443`);
    });
}
catch(exc){
    console.log("failed to start https server")
    console.log(exc)
}