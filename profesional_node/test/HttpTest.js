//#!jasmine
describe('Test Suite for the \'http\' library of Node', () => {
	const net = require('net');
	const http = require('http');
	const HTTP_PORT = 80;
	const LOCAL_PORT = 8124;
	const fs = require('fs');
	const {win32, posix} = require('path');
	const url = require('url');
	
	const util = require('util');
	const q = require('q');
	const path = require('path');
	
	it('shows how to response with generated content from http server', done => {
		const server = http.createServer((req, res) => {
			res.writeHead(200, {
				'Content-Type': 'text/plain'
			});
			let left = 10;
			const interval = setInterval(() => {
				if(0 >= --left){
					clearInterval(interval);
//					res.end(new Date().toDateString());
					res.end(Date.now() + '');
				}else{
					//res.write(new Date().toDateString());
					res.write(Date.now() + '');
				}
			}, 10);
		}).listen(LOCAL_PORT);
		
		http.get({
			port: LOCAL_PORT
		}, res => {
			res.setEncoding('utf8');
			res.on('data', chunk => {
				console.log('*received data from server', chunk);
			}).on('end', () => {
				console.log('*no more data from server');
				server.close(() => {
					console.log('*server closed');
					done();
				});
			});
		});
	});
	
	xit('shows how to build a simple http static file server', done => {
		const server = http.createServer((req, res) => {
			const file = path.normalize('./' + req.url);
			console.log('Trying to serve file: ', file);
			//res.end('hello there');
			
			function reportError(err){
				console.log(err);
				res.writeHead(500);
				res.end('Internal Server Error');
			}
			
			//q.nbind(fs.exists)(file).then(	//fs.exists cannot be converted to a promise through q.nbind, 
			//									//since there's only one param in callback function
			fs.exists(file, 
				exists => {
				console.log(`Does ${file} exist? ${exists}`);
				if(!exists){
					res.writeHead(404);
					res.end('Not Found');
					return;
				}
				
				q.nbind(fs.stat)(file).then(stat => {
					if(stat.isDirectory()){
						res.writeHead(403);
						res.end('Forbidden');
						return;
					}
					const rs = fs.createReadStream(file);
					rs.on('error', reportError);
					res.writeHead(200);
					rs.pipe(res);
				}).catch(err => {
					reportError(err);
				});
			})
//			.catch(e => {
//				console.log('file.exists error: ', e);
//			})
			;
		}).listen(LOCAL_PORT);
		
		http.get({
			port: LOCAL_PORT,
			//host: LOCAL_HOST,
			path: '/' + path.parse(__filename).base
			//path: '/derp'
		}, res => {
			res.setEncoding('utf8');
			
			res.on('data', chunk => {
				console.log('*received content from server', (500 > chunk.length ? chunk : chunk.substr(0, 500) + '...'));
				
			}).on('end', () => {
				console.log('*no more data from server');
				server.close(() => {
					console.log('http server closed');
					done();
				});
			});
		});
		
//		setTimeout(() => {
//			console.log('Time up');
//			server.close(() => {
//				console.log('http server closed');
//				done();
//			});
//		}, 2000);
	});
	
	xit('shows how to pipe stream into http response', done => {
		const s = http.createServer((req, res) => {
			res.writeHead(200, {
				'Content-Type': 'text/plain'
			});
			fs.createReadStream(__filename).pipe(res);
		}).listen(LOCAL_PORT);
		
		http.get({
			port: LOCAL_PORT
		}, res => {
			res.setEncoding('utf8');
			//
			
			res.on('data', chunk => {
				console.log('*received content from server: ', chunk);
			}).on('end', () => {
				console.log('*no more data from server');
			});
		});
		
		setTimeout(() => {
			console.log('Time up');
			s.close(() => {
				console.log('http server closed');
				done();
			});
		}, 2000);
	});
	
	xit('shows how to use the ServerResponse object', done => {
		const s = http.createServer((req, res) => {
			
			res.writeHead(200, {
				'Content-Type': 'text/plain',
				'Cache-Control': 'max-age=3600'
			});
			res.end('hello, world');
		}).listen(LOCAL_PORT);
		
		http.get({
			port: LOCAL_PORT
		}, res => {
			res.setEncoding('utf8');
			console.log(`res.headers = ${JSON.stringify(res.headers)}`);
			
			res.on('data', chunk => {
				console.log(`*received data from server: ${chunk}`);
			}).on('end', () => {
				console.log('*no more data in response');
			});
		});
		
		setTimeout(() => {
			console.log('Time up');
			s.close(() => {
				console.log('http server closed');
				done();
			});
		}, 2000);
	});
	
	xit('shows the basic attribute of an http request', done => {
		const s = http.createServer((req, res) => {
			console.log(`req.url = ${req.url}`);
			console.log(`req.method = ${req.method}`);
			//console.log(`req.headers = ${util.inspect(req.headers)}`);
			console.log(`req.headers = ${JSON.stringify(req.headers)}`);
			
			res.end('Summer is coming');
		});
		
		s.listen(LOCAL_PORT);
		
		http.get({
			port: LOCAL_PORT
		}, res => {
			res.setEncoding('utf8');
			console.log(`*status: ${res.statusCode}`);
			res.on('data', chunk => {
				console.log('*received data from server: ', chunk);
			}).on('end', () => {
				console.log('no more data in response');
			});
		});
		
		setTimeout(() => {
			console.log('Time up');
			s.close(e => {
				console.log('http server closed');
				done();
			});
		}, 2000);
	});
	
//	it('show how to listen to "connect" event on http.ClientRequest object', done => {
//		const server = http.createServer((req, res) => {
//			res.writeHead(200, {
//				'Content-Type': 'text/plain'
//			});
//			res.end('okay');
//		}).listen(LOCAL_PORT);
//		
//		//
//		server.on('connect', (req, clientSocket, head) => {	//listen on the HTTP CONNECT method
//			
//		}).listen(LOCAL_PORT, () => {	//listen on the listening event
//			
//		});
//		
//	});
	
	
	xit('shows how ot use the http.ClientRequest object', done => {
		const server = http.createServer((req, res) => {
			console.log('request established');
			req.on('aborted', () => {
				console.log('request aborted');
			}).on('close', () => {
				console.log('request closed');
			});
			console.log('req.headers:', req.headers);
			console.log('req.httpVersion', req.httpVersion);
			console.log('req.method', req.method);
			console.log('req.rawHeaders', req.rawHeaders);
			console.log('req.rawTrailers', req.rawTrailers);
			console.log('req.url', req.url);
			
			res.end('hello from server');
		}).listen(LOCAL_PORT);
		
		//cr: client request
		const cr = http.get({
//			hostname: 'www.google.com',
//			port: HTTP_PORT,
			port: LOCAL_PORT,
			path: '/'
		});
		cr.on('err', e => {
			console.log('*client request error', e);
		}).on('abort', () => {
			console.log('*client request aborted');
		}).on('aborted', () => {
			console.log('*client request aborted');
		}).on('response', res => {
			console.log('*res.statusCode', res.statusCode);
			console.log('*res.statusMessage', res.statusMessage);
			console.log('*res.trailers', res.trailers);
//			res.socket.setEncoding('utf8');
//			res.socket.on('data', chunk => {
//				console.log('*server response', chunk);
//			}).on('end', () => {
//				console.log('*server response ended');
//			}).on('close', () => {
//				console.log('*server response closed');
//			});
			res.setEncoding('utf8');
			res.on('data', chunk => {
				console.log('*server response:', chunk);
			}).on('end', () => {
				console.log('*server response ended');
			}).on('close', () => {
				console.log('*server response closed');
			});
		})
//		.on('connect', (res, socket, head) => {
//			socket.setEncoding('utf8');
//			socket.on('data', chunk => {
//				console.log('*server response', chunk);
//			}).on('end', () => {
//				console.log('*server response ended');
//			}).on('close', () => {
//				console.log('*server response closed');
//			});
//		})
		.on('socket', s => {
			console.log('*socket established, s.address:', s.address());
		})
		;
		
		setTimeout(() => {
			console.log('Time up');
			server.close(() => {
				console.log('server closed');
				done();
			});
		}, 2000);
		
	});
	
	xit('shows the supported methods & status codes', done => {
		console.log('supported methods:', http.METHODS);
		console.log('supported status codes:', http.STATUS_CODES);
	});
	
	xit('shows how to check the status of a http Agent', done => {
		const ga = http.globalAgent;
		console.log('global agent:', ga);
		console.log('sample invocation of getName:', ga.getName({
			host: 'localhost',
			port: '80',
			localAddress: '5432'
		}));
		
		done();
	});
	
	xit('shows how to create a simple Http server', done => {
		const server = http.createServer();
		server.on('request', (req, res) => {
			res.writeHead(200, {
				'Content-Type': 'text/plain'
			});
			res.write('Hello, World!');
			res.end();
		});
		server.listen(LOCAL_PORT);
		
		//
		const client = net.connect(LOCAL_PORT, () => {
			console.log('*connection established');
		});
		client.setEncoding('utf8');
		client.on('data', chunk => {
			console.log('*received content:', chunk);
		});
		client.write('GET / HTTP/1.1\n\n');
		client.end();
		
		client.on('end', () => {
			console.log('*client request ended');
		});
		
		
		setTimeout(() => {
			console.log('Time up');
			server.close(() => {
				done();
			});
		}, 2000);
	});
	
	xit('shows how to get a http response from a remote server', done => {
		//const request = http.
		const client = net.connect(HTTP_PORT, 'www.google.com', () => {
		//const client = net.connect(8001, () => {
			client.setEncoding('utf8');
			console.log('*connected to server successfully');
			
//			client.write('GET / HTTP/1.1\n');
//			client.write('Connection: keep-alive\n');
//			client.write('Accept: text/html, application/xhtml+xml, application/xml\n');
//			client.write('Accept-Encoding: gzip, deflate, sdch, br\n');
//			client.write('Accept-Language: en-US, en\n');
//			client.end('\n');
		}).on('error', err => {
			console.log('*client connection error', err);
		}).on('close', () => {
			console.log('*client connection closed');
			//done();
		}).on('data', chunk => {
			console.log('*data received from server\n', 
				//200 > chunk.length ? chunk : chunk.substr(0, 200) + '...'
				chunk
			);
		}).on('end', () => {
			console.log('*connection ended');
			//done();
		});
		
		//
		client.write('GET / HTTP/1.1\n');
		//client.write('HOST: localhost:8001');
//		client.write('Connection: keep-alive\n');
//		client.write('Accept: text/html, application/xhtml+xml, application/xml\n');
//		client.write('Accept-Encoding: gzip, deflate, sdch, br\n');	//<- if gzip is set, the response may be compressed;
//		client.write('Accept-Language: en-US, en\n');
		client.end('\n');	//<- this line is required;
		setTimeout(() => {
			console.log('Time up');
			client.destroy();
			//
			done();
		}, 2000);
	});
});