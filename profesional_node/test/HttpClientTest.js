//#!jasmine
describe('Test Suite to check the node.http library and make some http requests with it', () => {
	
	const http = require('http');
	const fs = require('fs');
	const path = require('path');
	const LOCAL_PORT = 8124;
	const request = require('request');
	const inspect = require('util').inspect;
	
	it('shows how to set custom request headers', done => {
		const HTTP_PORT = 4001;
		
		const options = {
			url : 'http://localhost:' + HTTP_PORT + '/abc/def',
			method: 'PUT',
			headers: {
				'X-My-Header': 'value'
			}
		};
		
		request(options, (err, res, body) => {
			if(err){
				throw err;
			}
			console.log(inspect({
				err: err,
				res: {
					statusCode: res.statusCode,
					headers: res.headers
				},
				body: JSON.parse(body)
			}));
			done();
		});
	});
	
	xit('shows how to make a http requeset with the "request" library - redirect version', done => {
		const HTTP_PORT = 4001;
		
		request('http://localhost:' + HTTP_PORT + '/redirect', (err, res, body) => {
			if(err){
				throw err;
			}
			console.log(inspect({
				err: err,
				res: {
					statusCode: res.statusCode
				},
				body: JSON.parse(body)
			}));
			done();
		});
	});
	xit('shows how to make a http requeset with the "request" library', done => {
		const HTTP_PORT = 4001;
		
		const request = require('request');
		const inspect = require('util').inspect;
		
		request('http://localhost:' + HTTP_PORT + '/abc/def', (err, res, body) => {
			if(err){
				throw err;
			}
			console.log(inspect({
				err: err,
				res: {
					statusCode: res.statusCode
				},
				body: JSON.parse(body)
			}));
			done();
		});
	});
	
	xit('shows how to make a http GET requeset', done => {
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