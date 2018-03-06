/* 
 * To run this test, you need to run server script ../data/suqaring-server.js first;
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
	
	function done(testDone){
		return function(err, results){
			//outputResult(arguments);
			//outputResult.apply(arguments);
			outputResult(err, results);
			testDone();
		};
	}
	xit('tests series call with the async library', test => {
		
		async.series([next => {	//async.series will also work
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
		}], done(test));
	
	});
	
	xit('tests cascading call with it.waterfall', test => {
		async.waterfall([
			next => {
				request.post({
					uri: 'http://localhost:8080', body: '3'
				}, next);
			},
			(res, body, next) => {
				request.post({
					uri: 'http://localhost:8080', body: body
				}, next);
			}
		], done(test));
	});
	
	
	it('shows how ot utilize the async.queueo to arrange asynchronous works', test => {
		test();
	});
	
});