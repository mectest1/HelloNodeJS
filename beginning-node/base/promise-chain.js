'use strict';

const Q = require('q');

Q.when(null)
		.then(() => {
			return 'kung foo';
}).then(val => {
	console.log(val);	//kung foo
	return Q.when('panda');
}).then(val => {
	console.log(val);	//panda
	//Nothing returned
}).then(val => {
	console.log(undefined === val);	//true
});