'use strict';

//
const Q = require('q');

Q.when(null).then(val => {
	console.log(null === val);	//true
});

Q.when('kung foo').then(val => {
	console.log(val);	//kung foo
});

//
console.log('I will print first because *then* is always async!');
