//#!node
const http = require('http');

const server = http.createServer((req, res) => {
	//req is an http.IncomingMessage, which is a Readable Stream
	//res is an http.ServerResponse, which is a Writable Stream
	
	let body = '';
	//Get the data as utf8 strings
	//If an encoding is not set, Buffer objects will be received;
	req.setEncoding('utf8');
	
	//Readable stream emit 'data' events once a listener is received
	req.on('data', chunk => {
		//console.log('chunk received', chunk);
		body += chunk;
	});
	
	//the end event indicates that the entire body has been received;
//	req.on('end', (data) => {
	req.on('end', () => {
		try{
			//body += data || '';
			//console.log('request data ends with ', data);
			//const data = JSON.parse(body);
			//write back something interesting to the user
			//res.write('type of data is');
			//res.end(typeof data);
			res.end('final data received: ' + body);
		}catch(err){
			//uh oh, bad json
			res.statusCode = 400;
			return res.end('err: ' + err.message);
		}
	});
	
	
});

server.listen(1337);
console.log('http server listening on port', 1337);

process.on('exit', () => {
	console.log('http server existed');
});
process.on('exit', () => {
	console.log('http server existed');
});