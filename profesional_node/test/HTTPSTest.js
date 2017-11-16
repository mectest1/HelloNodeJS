
const https = require('https');
const fs = require('fs');
const util = require('util');

describe('HTTPS test suite', () => {
	it('shows how to make an HTTPS request', done => {
		const options = {
			host: 'google.com',
			methoed: 'GET',
			path: '/'
		};
		
		//
		var req = https.request(options, res => {
			console.log(`res.socket.authorized: ${res.socket.authorized}`);
			var certStr =  util.inspect(res.socket.getPeerCertificate());
			console.log(`peer certificatte:${certStr}`);
			done();
		});
		req.end();
		
		//
	});
});