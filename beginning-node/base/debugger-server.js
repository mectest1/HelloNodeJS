'use strict';

const http = require('http');

let server = http.createServer((req, res) => {
	console.log('request starting ...');
	
	//respond
	res.write('hello client');
	res.end();
});

const PORT = 3000;
server.listen(PORT);
console.log('Server rnning at port', PORT);