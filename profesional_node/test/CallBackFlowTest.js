/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const async = require('async'),
		request = require('request');

describe('Typical callback paradigms in JS', () => {
	function outputResult(err, results){
		if(err){
			console.log(`Error occrued: %s`, err.message);
			throw err;
		}
		console.log('result: %j', results);	//%j is a Node.js specific placeholder, for JSON.stringify()
	}
	it('testst series call with the async library', testDone => {
		function done(err, results){
			//outputResult(arguments);
			//outputResult.apply(arguments);
			outputResult(err, results);
			testDone();
		}
		async.series([next => {
			request.post({
				uri: 'http://localhost:8080', body: '4'
			}, (err, res, body) => {
				next(err, body && JSON.parse(body));
			});
		}, next => {
			request.post({
				uri: 'http://localhost:8080', body: '5'
			}, (err, res, body) => {
				next(err, body && JSON.parse(body));
			});
		}], done);
	});
});