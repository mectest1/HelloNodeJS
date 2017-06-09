//#!jasmine
describe('TestSuite to show show how to click to a TCP Server with node.Net', () => {
	const net = require('net');
	const path = require('path');
	const fs = require('fs');
	const q = require('q');
	const LOCAL_PORT = 8124;
	
	const DEFAULT_TRIM_LENGTH = 200;
	function trimContent(str, trimLength){
		trimLength = trimLength || DEFAULT_TRIM_LENGTH;
		if(!(str && str.length)){
			return str;
		}
		return trimLength > str.length ? str : str.substr(0, trimLength) + '...';
	}
	
	
	it('shows how to build a auto-reconnecting TCP client', done => {
//		const server = net.createServer({
//			allowHalfOpen: true
//		}, conn => {
//			console.log('connection established successfully');
//			conn.setEncoding('utf8');
//			conn.on('data', chunk => {
//				console.log('received data from client: ', chunk);
//			}).on('end', () => {
//				console.log('connection ended');
//				server.close(() => {
//					console.log('connection closed');
//					done();
//				});
//			});
//		}).listen(LOCAL_PORT);
		
		const RETRY_TIMEOUT = 300;
		let retriedTimes = 0;
		let conn;
		const MAX_RETRIES = 10;
		(function connect(){
			function reconnect(){
				if(MAX_RETRIES <= retriedTimes){
					throw new Error('Max retries have been exceeded, now it\'s time to give up');
				}
				++retriedTimes;
				setTimeout(connect, RETRY_TIMEOUT);
			}
			
			conn = net.createConnection(LOCAL_PORT, () => {
				console.log("*Client connection established'");
			}).on('error', err => {
				console.log('Error in connection', err);
			}).on('close', () => {
				console.log('Connection got closed, will try to reconnect');
				reconnect();
			});
			conn.setEncoding('utf8');
			
			//fs.createReadStream(__filename).pipe(conn);
			conn.pipe(process.stdout, {
				end: false
			});
		})();
		
		
		setTimeout(() => {
			console.log('Time up');
			done();
		}, 2000);
	});
	
	//
	xit('shows how to connect to a TCP server', done => {
		
		const server = net.createServer({
				allowHalfOpen: true
			}, conn => {
			//'connection' listener
			console.log('Connection established');
			conn.setEncoding('utf8');
			conn.on('data', chunk => {
				console.log('received data from client side: ', trimContent(chunk));

			}).on('end', () => {
				console.log('client data ended');
				conn.end('goodbye client');
				server.close(() => {
					console.log('server closed successfully');

				});
			});
		}).on('error', e => {
			throw e;
		}).listen(LOCAL_PORT, () => {
			console.log('server bound on port: ', LOCAL_PORT);
		});

		//
		const conn = net.connect({
			port: LOCAL_PORT
		});
		conn.setEncoding('utf8');
		conn.setDefaultEncoding('utf8');
		conn.on('connect', () => {
			console.log('*client connection established');
		}).on('data', chunk => {
			console.log('*content received from server: ', chunk);
		}).on('end', () => {
			console.log('*client connection ended');
			done();
		});
		fs.createReadStream(__filename).pipe(conn, {
			//end: false
		});

//		setTimeout(() => {
//			console.log('Time up');
//			done();
//		}, 2000);
	});
	
});