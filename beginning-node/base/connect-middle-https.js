'use strict';

const https = require('https');

const fs = require('fs');
const path = require('path');

let options = {
	key: fs.readFileSync(path.resolve(__dirname, '../data/key.pem')),
	cert: fs.readFileSync(path.resolve(__dirname, '../data/cert.pem'))
};

//
const connect = require('connect');
const PORT = 3000;
//Create a connect dispatcher
let app = connect();
https.createServer(options, app).listen(PORT);
console.log('Server running on port ', PORT);