//#!jasmine
describe('Test suite for the Net library', () => {
	const net = require('net');
	const PORT = 8124;
	const q = require('q');
	const fs = require('fs');
	
	
	it('shows how to build a simple chat server', done => {
		let sockets = [];
		const server = net.createServer().on('error', err => {
			console.log('Server error', err.message);
		}).on('close', () => {
			console.log('server closed');
		}).on('connection', socket => {
			console.log('got a new connection');
			sockets.push(socket);
			socket.setEncoding('utf8');
			socket.on('data', chunk => {
				console.log('got data: ', chunk);
				sockets.filter(s => s !== socket).map(s => {
					s.write(chunk);
				});
			}).on('close', () => {
				console.log('connection closed');
				sockets = sockets.filter(s => s !== socket);
			});
		})
		.listen(PORT);

		const clients = [];
		Array.of(0, 1, 2).forEach(num => {
			const client = net.connect(PORT);
			clients.push(client);
			client.setEncoding('utf8');
			client.on('error', err => {
				console.log(`*client#${num} error: ${err.message}`);
			}).on('close', () => {
				console.log(`*client#${num} closed`);
			}).on('connect', () => {
				console.log(`*client#${num} connect to server successfully with addressA: ${JSON.stringify(client.address())}`);
			}).on('data', chunk => {
				console.log(`*client#${num} received data from server: ${chunk}`);
			});
		});
		clients.forEach((c, index) => {
			c.write(`hello from client#${index} `);
		});
		
		setTimeout(() => {
			clients.forEach((c, index) => {
				c.end(`client #${index} says bye bye `);
			});
		}, 500);
		
		
		setTimeout(() => {
			console.log('Time up');
			server.close(() => {
				done();
			});
		}, 2000);
	});
	
	xit('shows how to set timeout of the socket', done => {
		const server = net.createServer(socket => {
			socket.setEncoding('utf8');
			socket.setTimeout(1000, () => {
				console.log('connection has been inactive for 1 second, end the connection now');
				socket.end('bye bye');
			}).on('connection', socket => {
				console.log('received connection from client');
			});
		}).listen(PORT);
		
		net.connect(PORT).on('connect', () => {
			console.log('*successfully connect to server');
		}).on('data', chunk => {
			console.log('*response got from server:', chunk.toString());	
		}).on('end', () => {
			console.log('*connection ended');
		}).on('close', () => {
			console.log('*connection closed');
		});
		
		setTimeout(() => {
			console.log('Time up');
			server.close((e) => {
				done();
			});
		}, 2000);
	});
	
	xit('shows how to create a simple echo TCP server', done => {
		const server = net.createServer(socket => {
			console.log('new connection');
			socket.setEncoding('utf8');
			
			//
			socket.write('hello! you can start typing anhtying now. Type \'quite\' to exit.\n');
			
			socket.on('data', chunk => {
				console.log('got: ', chunk);
				if('quit' !== chunk){
					socket.write(chunk);
				}else{
					socket.end('byte byte');
				}
			});
			
			socket.on('end', () => {
				console.log('client connection ended');
			});
		}).listen(PORT);
		
		
		//
		const client = net.connect(PORT);
		client.setEncoding('utf8');
		client.on('data', chunk => {
			console.log('*client received:', chunk);
		});
		client.on('end', () => {
			console.log('*client connection ended');
			//client.destroy();
		});
		//if the {end: false} is not set here, the net.Socket will be ended automatically;
		fs.createReadStream(__filename).pipe(client, {end: false});
		setTimeout(() => {
			client.end('quit');
		}, 500);
		
		
		setTimeout(() => {
			console.log('time up');
			done();
		}, 2000);
		
	});
	
	xit('show the lifecycle of a TCP server', done => {
		const server = net.createServer();
		
		//
		server.on('listening', () => {
			console.log('server is listening on address', server.address());
		});
		
		server.on('connection', socket => {
			console.log('server has a new connection');
			socket.end('server says hello');
			server.close();
		});
		
		server.on('close', () => {
			console.log('server is now closed');
		});
		
		server.on('error', err => {
			console.log('Error occurred', err.message);
		});
		server.listen(PORT);
		const client = net.connect(PORT);
		client.setEncoding('utf8');
		client.on('connect', () => {
			console.log('*successfully connect to server');
		});
		client.on('data', chunk => {
			console.log('*data received from server:', chunk);
		});
		client.on('end', () => {
			console.log('*client ended');
		});
		client.on('close', () => {
			console.log('*client closed');
		});
		
		setTimeout(() => {
			client.destroy();
		}, 500);
		setTimeout(() => {
			console.log('Time up');
			done();
		}, 1000);
	});
	
	xit('shows how to create server/client with .createServer()/.createConnection()', done => {
		const server = net.createServer(c => {	//A connection listener is added here
			//'connection' listener
			console.log('client connected');
			console.log(`c info: localAddress: ${c.localAddress}, 
					localPort: ${c.localPort}, remoteAddress: ${c.remoteAddress},
					remoteFamily: ${c.remoteFamily}, remotePort: ${c.remotePort}`);
			c.on('end', () => {
				console.log(`c.bufferSize: ${c.bufferSize}, c.bytesRead: ${c.bytesRead}, c.bytesWritten: ${c.bytesWritten}`);
				console.log('client discontinued');
				//c.close();
			});
			c.pipe(c);					//LOL
			c.end('hello from server');
//			setTimeout(() => {
//				c.end('hello from server\n');
//			}, 500);
			
			//
			
			setTimeout(() => {
				//console.log('Time up, server terminated');
				console.log('all contents has been sent to client, server terminated now');
				//c.destroy('try to destroy the client connection');
				server.close(() => {
					console.log('server closed listener #2');
				});
			}, 1000);
		});
		
		server.on('close', () => {
			console.log('server closed listener #1');
		});
		server.on('connection', c => {
			console.log('new connection establisted, connection type:', typeof c);
			q.nbind(server.getConnections)().then(cs => {
				console.log('current connections', cs);
			}).catch(e => {
				console.log('getConnections failed', e.message);
			});
		});
		
		server.on('error', e => {
			console.log(e);
		});
		server.listen(PORT, () => {
			console.log('server bound with address', server.address());
			console.log('max connections', server.maxConnections);
		});
		
		
		//
		const client = net.createConnection(PORT, () => {
			console.log('*client connect successfully');
			//client.write('hello from client');
			console.log(`*client info: localAddress: ${client.localAddress}, 
					localPort: ${client.localPort}, remoteAddress: ${client.remoteAddress},
					remoteFamily: ${client.remoteFamily}, remotePort: ${client.remotePort}`);
		});
		client.setEncoding('utf8');
		client.on('lookup', (err, address, family, host) => {
			if(err){
				console.error('*client lookup failed with error', err);
				return;
			}
			console.log(`*client lookup finished with address: ${address}, family: ${family}, host: ${host}`);
		});
		client.on('data', chunk => {
			console.log('*client data received from server:', chunk);
		});
		client.on('end', () => {
			console.log('*client received end info from server trying to destroy client');
			client.destroy();
		});
		client.on('close', () => {
			console.log('*client closed');
			console.log(`*client.bufferSize: ${client.bufferSize}, client.bytesRead: ${client.bytesRead}, client.bytesWritten: ${client.bytesWritten}`);
		});
		client.on('error', e => {
			console.log('*client error encountered', e);
		});
		
		
		setTimeout(() => {
			console.log('Time up');
			done();
		}, 2000);
	});
	
	xit('shows that .createConnection() and .connect() are the same', () => {
		console.log('net.createConnection === net.connect? ', net.createConnection === net.connect);
		expect(net.createConnection).toBe(net.connect);
	});
});