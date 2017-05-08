
//#!jasmine
describe('Test suite for the Stream library', () => {
	
	const stream = require('stream');
	const child_process = require('child_process');
	const path = require('path');
	const http = require('http');
	const fs = require('fs');
	const q = require('q');
	
	it('shows how to use the .pipe() method to solve the slow client problem', done => {
		const httpServer = path.join(__dirname, '../data/stream-http-server-pipe.js').normalize();
		const hs = child_process.fork(httpServer);
		const req = http.get('http://localhost:1337', res => {
			res.setEncoding('utf8');
			res.on('data', console.log);
			res.on('error', console.error);
		});
		setTimeout(() => {
			console.log('Time up, http server will be terminated');
			hs.kill();
			done();
		}, 1000);
	});
	
	xit('shows how to use .resume/.pause to resolve the slow client problem', done => {
		const httpServer = path.join(__dirname, '../data/stream-http-server-pause-resume.js').normalize();
		const hs = child_process.fork(httpServer);
		
		const req = http.get('http://localhost:1337', res => {
			res.setEncoding('utf8');
			res.on('data', console.log);
			//res.on('end', () => {});
			res.on('error', e => {
				console.log(e);
			});
		});
		
		setTimeout(() => {
			console.log('Time up, http server will be terminated now');
			hs.kill();
			done();
		}, 1000);
	});
	
	xit('shows how to use opened file descriptor to create a readable stream', done => {
		q.nbind(fs.open)(__filename, 'r').then(fd => {
			console.log('file opened with file descriptor', fd);
			fs.createReadStream(null, {
				fd,
				encoding: 'utf8', 
				start: 0,	//if this param is omitted, then the whole file will be read anyway
				end: 100
			})
//			.on('data', chunk => {
//				console.log(chunk);
//				done();
//			})
			.on('data', console.log)
			.on('error', console.error);
		}).catch(e => console.error);
		setTimeout(done, 1000);
	});
	
	xit('shows how to consume readable stream without actually processing data', done => {
		fs.createReadStream(__filename).resume().on('end', () => {
			console.log('Reached the end of file, but did not read anything');
			done();
		}).on('error', e => {
			console.log('error occurred while resume readable strea', e);
			done();
		});
	});
	
	
	xit('shows how ot use .pipe() to read data', (done) => {
		console.log('now let\'s start reading file');
		fs.createReadStream(__filename).pipe(process.stdout);
		
		setTimeout(() => {
			console.log('read file finished');
			done();
		}, 1000);
	
	});
	
	xit('shows how to use .read() to read data from file', done => {
		const cur = fs.createReadStream(__filename);
		cur.setEncoding('utf8');
		cur.pause();
		console.log('stream.isPaused? ', cur.isPaused());
		cur.on('readable', () => {
			let chunk = null;
			while(null != (chunk = cur.read())){
				//console.log('received ', chunk.length, 'bytes of data');
				console.log('stream.isPaused? ', cur.isPaused());
				console.log(100 > chunk.length ? chunk : chunk.substr(0, 100) + '...');
			};
			console.log('stream.isPaused? ', cur.isPaused());
			console.log('------reading file end');
			done();
		});
	});
	
	xit('shows how to listen to the stream events', done => {
		const cur = fs.createReadStream(__filename);
		
		cur.setEncoding('utf8');
		cur.on('close', () => {
			console.log('------readable stream closed');
			done();
		});
		cur.on('data', chunk => {
			console.log(100 > chunk.length ? chunk : chunk.substr(0, 100) + '...');
		});
		cur.on('end', () => {
			console.log('------readable stream ended');
			done();
		});
		cur.on('error', e => {
			console.log('error occurred while trying to read file');
			done();
		});
		cur.on('readable', () => {
			console.log('----new readable stream info available');
		});
	});
	
	xit('shows how to listen to the cor/uncork method', done => {
		const fileReader = fs.createReadStream(__filename);
		const httpServer = child_process.fork(path.join(__dirname, '../data/stream-http-server.js').normalize());
		
		//req: http.ClientRequest, 
		const req = http.request({
			port: 1337,
			method: 'POST'
		}, res => {
			res.setEncoding('utf8');
			let respData = '';
			res.on('data', chunk => respData += chunk);
			res.on('end', () => {
				console.log('received response from server: [', 
					100 < respData.length ? respData.substring(0, 100) + '...' : respData
				, ']');
			});
		});
		
		//The http.RequestClient implements WritableStr3am interface. 
		req.cork();	//.cork() is not available for http.ClientReq3uest
		
		
		q.nbind(fs.readFile)(__filename).then(data => {
			console.log('starting to write to client request');
			req.write(data.toString());
			
			console.log('now wait for 1 second before actually sending content to http server');
			req.uncork();
		}).catch(e => {
			console.error('error occurred while reading file: ', e);
			done();
		});
		
		setTimeout(() => {
			console.log('Time up, http server terminated');
			httpServer.kill();
			done();
		}, 2000);
	});
	xit('shows how to listen to the "pipe" event on the WritableStream', done => {
		const fileReader = fs.createReadStream(__filename);
		const httpServer = child_process.fork(path.join(__dirname, '../data/stream-http-server.js').normalize());
		
		//req: http.ClientRequest, 
		const req = http.request({
			port: 1337,
			method: 'POST'
		}, res => {
			res.setEncoding('utf8');
			let respData = '';
			res.on('data', chunk => respData += chunk);
			res.on('end', () => {
				console.log('received response from server: [', 
					100 < respData.length ? respData.substring(0, 100) + '...' : respData
				, ']');
			});
		});
		
		req.on('pipe', src => {
			console.log('Note: something is piping into the writer');
			expect(src).toBe(fileReader);
		}).on('unpipe', src => {
			console.log('Note: something has finished pipe into the writeer');
			expect(src).toBe(fileReader);
		});
		
		//By default, stream.end() is called on the destination Writable stream when
		//the source Readable stream emits 'emd', so that the destination is no longer 
		//writable. To disable this default behavior, the 'end' option can be passed as 
		//'false', causing the destination stream to remain open.
//		filReader.pipe(req, {end: false});
//		fileReader.on('end', () => {
//			req.end('Goodbye');
//		});
		fileReader.pipe(req);
		setTimeout(() => {
			fileReader.unpipe(req);
		}, 1000);
		
		setTimeout(() => {
			console.log('Time up, http server terminated');
			httpServer.kill();
			done();
		}, 2000);
	});
	
	xit('shows that the "finish" event is emitted after the strea.end() method has been called,\
		and all data has been flushed to the underlying system', done => {
		const httpServerScript = path.join(__dirname, '../data/stream-http-server.js').normalize();
		const httpServer = child_process.fork(httpServerScript);
		
		const req = http.request({
			port: 1337,
			method: 'POST'
		}, res => {
			res.setEncoding('utf8');
			let respData = '';
			res.on('data', chunk => respData += chunk);
			res.on('end', () => {
				console.log('received response from server: [', 
					100 < respData.length ? respData.substring(0, 100) + '...' : respData
				, ']');
			});
		});
		//
		req.on('finish', () => {
			console.log('All writes are now complete');
		});
		for(let i = 0; i < 100; ++i){
			req.write('hello, world');
		}
		req.end('This is the end');
		
		
		setTimeout(() => {
			console.log('Time up, http server terminated');
			httpServer.kill();
			done();
		}, 3000);
	});
	
	
	xit('shows how to listen on the "error" event for WritableStream', done => {
		const httpServerScript = path.join(__dirname, '../data/stream-http-server.js').normalize();
		const httpServer = child_process.fork(httpServerScript);
		
		const req = http.request({
			port: 1337,
			method: 'POST'
		}, res => {
			res.setEncoding('utf8');
			let respData = '';
			res.on('data', chunk => respData += chunk);
			res.on('end', () => {
				console.log('received response from server: [', 
					100 < respData.length ? respData.substring(0, 100) + '...' : respData
				, ']');
			});
		});
		//
		req.on('error', err => {
			console.error('send request data failed with error', err);
			done();
		});
		//end the http server
		req.write('hello');
		httpServer.kill();
		req.end('world');
		
		setTimeout(() => {
			console.log('Time up, http server terminated');
			httpServer.kill();
			done();
		}, 3000);
	});
	
	xit('shows the basic usage of Writable Streams: how to write data and listen on "drain" event', done => {
		const httpServerScript = path.join(__dirname, '../data/stream-http-server.js').normalize();
		const httpServer = child_process.fork(httpServerScript);
		const httpServerUrl = 'http://localhost:1337';
		
		const req = http.request({
			port: 1337,
			method: 'POST'
		}, res => {
			const {statusCode} = res;
			const contentType = res.headers['content-type'];
			
			//
			res.setEncoding('utf8');
			let respData = '';
			res.on('data', chunk => respData += chunk);
			res.on('end', () => {
				console.log('received response from server: [', 
					100 < respData.length ? respData.substring(0, 100) + '...' : respData
				, ']');
				//
			});
		});
		
		(function(writer, data, encoding, callback){
			let i = 10000;
			
			write();
			function write(){
				let ok = true;
				do{
					--i;
					if(0 === i){
						//write for the last time;
						//writer.write(data, encoding, callback);
						writer.end(data, encoding, callback);
					}else{
						//see if we should continue, or wait
						//don't pass the callback, because we're not done yet
						ok = writer.write(data, encoding);
					}
				}while(0 < i && ok);
				if(0 < i){
					//stopped early?
					//then continue writing process once it drains
					writer.once('drain', () => {
						console.log('drain event triggered');
						write();
					});
				}
			}
			
		}(req, 'hello, world'));
		
		
		setTimeout(() => {
			console.log('Time up, http server terminated');
			httpServer.kill();
			done();
		}, 3000);
	});
	
	xit('says hello to the Stream library', done => {
		//console.log('hello, stream');
		
		const httpServerScript = path.join(__dirname, '../data/stream-http-server.js').normalize();
		const httpServer = child_process.fork(httpServerScript);
		const httpServerUrl = 'http://localhost:1337';
		const postData = JSON.stringify({
			msg: 'hello, world'
		});
		const req = http.request({
			port: 1337,
			method: 'POST'
		}, res => {
//		const req = http.get(httpServerUrl, res => {
			const {statusCode} = res;
			const contentType = res.headers['content-type'];
			
			//
			if(200 !== statusCode){
				let error = new Error('Request failed, status code: ' + statusCode);
				console.error(error);
				done();
			}
			
			//
			res.setEncoding('utf8');
			let rawData = '';
			res.on('data', chunk => rawData += chunk);
			res.on('end', () => {
				console.log(`received response from server [${rawData}]`);
				httpServer.kill();
				//done();
			}).on('error', e => {
				console.log('Get error', e);
				httpServer.kill();
				//done();
			});
			
			
		});
		req.end(postData, () => {
			console.log('request data sent successfully', postData);
		});
		
		//console.log('the server will be closed after 3 seconds');
		setTimeout(() => {
			done();
			//httpServer.kill();
		}, 3000);
//		
	});
});