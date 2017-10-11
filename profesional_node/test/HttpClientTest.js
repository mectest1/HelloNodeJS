//#!jasmine
describe('Test Suite to check the node.http library and make some http requests with it', () => {
	
	const http = require('http');
	const fs = require('fs');
	const path = require('path');
	const LOCAL_PORT = 8124;
	
	it('shows how to make a http GET requeset', done => {
		const options = {
			host: 'www.google.com',
			port: 80,
			path: '/index.html'
		};
		
		http.get(options, res => {
			console.log('Got response', res.statusCode);
			res.setEncoding('utf8');
			res.on('data', chunk => {
				console.log('received content from server:');
				console.log(100 < chunk.length ? chunk.substr(0, 100) + '...' : chunk);
			}).on('end', () => {
				done();
			});
		});
	});
});