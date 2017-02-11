'use strict';

function send404(response){
	response.writeHead(404, {
		'Content-Type': 'text/plain'
	});
	response.write('Error 404: Resource not found.');
	response.end();
}


const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const htmlFilePath = path.join(__dirname, '../client/index.html');
let server = http.createServer((req, resp) => {
	if(req.method === 'GET' && req.url === '/'){
		resp.writeHead(200, {
			'Content-Type': 'text/html'
		});
		fs.createReadStream(htmlFilePath).pipe(resp);
	}else{
		send404(resp);
	}
}).listen(PORT);
console.log('Server running on port ' + PORT);