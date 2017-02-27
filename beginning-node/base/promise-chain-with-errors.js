'use strict';

const Q = require('q');

Q.when(null)
		.then(() => {
			throw new Error('panda');	//uncaught exception
}).then(val => {
	console.log('!!!', val);	//will never get called
}).catch(reason => {
	console.log('Someone threw a', reason.message);
	return 'all good';
}).then(val => {
	console.log(val);	//all good
	return Q.reject(new Error('taco'));
}).then(val => {
	console.log('!!!!!', val);		//will never get called
}).catch(reason => {
	console.log('Someone threw a', reason.message);
})