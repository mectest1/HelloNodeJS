
const PORT = 4001;
const HELP_MSG = 'HTTP server started, listening on port ' + PORT + 
		'\nYou may use the "curl" command to send HTTP request and check the HTTP response result.' +
		'\ni.e. curl http://localhost:' + PORT + ', curl -d "Hello, World" http://localhost:' + PORT + ', etc.';




require('http').createServer((req, res) => {
	
	function printBack(){
		res.writeHead(200, {
			'Content-Type': 'text/plain'
		});
		res.end(JSON.stringify({
			url: req.url,
			method: req.method,
			headers: req.headers
		}));
	}
	
	switch(req.url){
		case '/redirect':
			res.writeHead(301, {
				'Location': '/'
			});
			res.end();
			break;
		case '/print/body':
			req.setEncoding('utf8');
			let body = '';
			req.on('data', d => {
				body += d;
			}).on('end', () => {
				res.end(JSON.stringify(body));
			});
			break;
		default: 
			printBack();
			break;
	}
}).on('close', () => {
	console.log('HTTP server closed');
}).listen(PORT);
console.log(HELP_MSG);
