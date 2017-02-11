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
const indexHtml = path.join(__dirname, '../client/index.html');
const mimeLookup = {
	'.js': 'application/javascript',
	'.html': 'text/html'
};
let server = http.createServer((req, resp) => {
	if(req.method === 'GET'){
		//resolve file path to filesystem path
		let fileUrl;
		console.log('req.url: ', req.url);
		if('/' === req.url){
			fileUrl = indexHtml;
		}else{
			fileUrl = req.url;
		}
		let filePath = path.resolve(__dirname + '/../client/' + fileUrl);
		console.log('resolevd filePath: ', filePath)
		
		//lookup mime type
		let fileExt = path.extname(filePath);
		let mimeType = mimeLookup[fileExt];
		
		if(!mimeType){
			send404(resp);
			return;
		}
		
		//See if we have that file
		fs.exists(filePath, (exists) => {
			if(!exists){
				send404(resp);
				return;
			}
			
			//finally stream the file
			resp.writeHead(200, {
				'Content-Type': 'text/html'
			});
			fs.createReadStream(filePath).pipe(resp);
		});
	}else{
		send404(resp);
	}
}).listen(PORT);
console.log('Server running on port ' + PORT);