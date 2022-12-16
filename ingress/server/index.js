const express = require('express');
const morgan = require("morgan");
const path = require('path')
const dotenv = require('dotenv')

const { createProxyMiddleware } = require('http-proxy-middleware');

const PROJECT_PATH = path.resolve(__dirname+ "/../..")


dotenv.config({ 
    debug: false,
    path: PROJECT_PATH+'/settings.ini' 
})

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

const API_SERVICE_URL = "http://localhost";


const io = require('./websocket').connect(http, {path: '/socket.io'})


// Logging
app.use(morgan('dev'));

app.get('/', function(req, res) {
    res.redirect('/home');
});

app.use('/home', createProxyMiddleware({
    target: API_SERVICE_URL+":"+PORT_HOME,
    changeOrigin: true,
    pathRewrite: {},
}));

app.use('/userinfo', createProxyMiddleware({
    target: API_SERVICE_URL+":"+PORT_USERINFO,
    changeOrigin: true,
    pathRewrite: {},
}));

app.use('/author', createProxyMiddleware({
    target: API_SERVICE_URL+":"+PORT_AUTHOR,
    changeOrigin: true,
    pathRewrite: {},
}));

app.use('/sheets', createProxyMiddleware({
    target: API_SERVICE_URL+":"+PORT_SHEETS,
    changeOrigin: true,
    pathRewrite: {},
}));
app.use('/brains', createProxyMiddleware({
    target: API_SERVICE_URL+":"+PORT_BRAINS,
    changeOrigin: true,
    pathRewrite: {},
}));

app.use('/shapes', createProxyMiddleware({
    target: API_SERVICE_URL+":"+PORT_SHAPES,
    changeOrigin: true,
    pathRewrite: {},
}));

app.use('/circuit', createProxyMiddleware({
    target: API_SERVICE_URL+":"+PORT_CIRCUIT,
    changeOrigin: true,
    pathRewrite: {},
}));

app.use('/common', createProxyMiddleware({
    target: API_SERVICE_URL+":"+PORT_COMMON,
    changeOrigin: true,
    pathRewrite: {},
}));

// Proxy endpoints
app.use('/permissions', createProxyMiddleware({
    target: API_SERVICE_URL+":"+PORT_PERMISSIONS,
    changeOrigin: true,
    pathRewrite: {},
}));

// Start Proxy
http.listen(PORT, () => {
    console.log(`Starting Ingress at http://${HOST}:${PORT}`);
});
