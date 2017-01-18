'ues strict';

const http = require('http');
const PORT = 3000;

let server = http.createServer((req, res) => {
	console.log('request starting...');
	
	console.log('request headers...');
	console.log(req.headers);
	
	//respond;
	res.write('hello, client');
	res.end();
});

server.listen(PORT);
console.log('Server running at http://localhost:3000/');