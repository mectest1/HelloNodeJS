'use strict';;
const https = require('https');

const fs = require('fs');
const path = require('path');
let options = {
	key: fs.readFileSync(path.resolve(__dirname, '../data/key.pem')),
	cert: fs.readFileSync(path.resolve(__dirname, '../data/cert.pem'))
};

const HTTPS_PORT = 443;
https.createServer(options, function(req, res){
	res.end('Secure!');
}).listen(HTTPS_PORT);

//Redirect from http port 80 to https
const http = require('http');
const HTTP_PORT = 3000;
http.createServer(function(req, res){
	res.writeHead(301, {
		Location: 'https://' + req.headers['host'] + req.url
	});
	res.end();
}).listen(HTTP_PORT);

console.log('server running on http port ', HTTP_PORT, ', https port ', HTTPS_PORT);