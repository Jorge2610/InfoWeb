const http2 = require('http2');
const proxy = require('http2-proxy');
const fs = require('fs');
const finalhandler = require('finalhandler');

const defaultWebHandler = (err, req, res) => {
    if (err) {
        console.error('proxy error', err);
        finalhandler(req, res)(err);
    }
};

const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
    allowHTTP1: true
};

const server = http2.createSecureServer(options);

server.on('request', (req, res) => {
    proxy.web(req, res, {
        hostname: 'localhost',
        port: 3000
    }, defaultWebHandler);
});

server.listen(443, () => {
    console.log("Proxy escuchando en el puerto 443...");
});