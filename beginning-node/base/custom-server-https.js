'use strict';

/**
 * openssl genrsa 1024 > key.pem
 * openssl req -x509 -new -key key.pem > cert.pem
 * @type Module https|Module https
 */
const https = require('https');
const fs = require('fs');
const path = require('path');
const PORT = 3000;

let options = {
	key: fs.readFileSync(path.resolve(__dirname, '../data/key.pem')),
	cert: fs.readFileSync(path.resolve(__dirname, '../data/cert.pem'))
};

https.createServer(options, function(req, res){
	res.end('Hello, Client');
}).listen(PORT);
console.log('server running on port: ', PORT);