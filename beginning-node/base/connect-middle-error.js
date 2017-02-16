'use strict';

const connect = require('connect');
const PORT = 3000;

connect()
		.use((req, res, next) => {
//			next('An error has occured');
			next(new Error('An error has occured'));
		}).use((req, res, next) => {
			res.end('I will never get called');
		}).use((err, req, res, next) => { //such a middleware is only called if there is an error.
			//Log the error on the server
			console.log('Error handled: ', err.message);
			console.log('StacktraceE: ', err.stack);
			
			//inform the client
			res.end('Unable to process the request');
		})
		.listen(PORT);
		
console.log('server running on port ', PORT);