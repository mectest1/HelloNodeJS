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
	
	
	xit('shows how ot utilize the async.queueo to arrange asynchronous works', test => {
		let maximum_concurrency = 5;
		
		function worker(task, callback) {
			request.post({
				uri: 'http://localhost:8080',
				body: JSON.stringify(task)
			}, (err, res, body) => {
				callback(err, body && JSON.parse(body));
			});
		}
		
		let queue = async.queue(worker, maximum_concurrency);
		queue.saturated = () => {
			console.log('queue is saturated');
		};
		queue.empty = () => {
			console.log('queue is empty');
		};
		queue.drain = () => {
			console.log('queue is drained. No more work');
			test();
		};
		[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(i => {
			queue.push(i, (err, result) => {
				if(err){
					throw err;
				}
				//
				console.log(i + '^2 = %d', result);
			});
		});
	});
	
	it('tests iterator', test => {
		const results = {};
		let collection = [1, 2, 3, 4, 5];
		function done(err){
			if(err){
				throw err;
			}
			console.log('done! results: %j', results);
		}
		function iterator(value, callback){
			request.post({
				uri: 'http://localhost:8080',
				body: JSON.stringify(value)
			}, (err, res, body) => {
				if(err){
					return callback(err);
				}
				results[value] = body;
				callback();
			});
		}
		async.forEach(collection, iterator, () => {
			done();
			test();
		});
	});
});