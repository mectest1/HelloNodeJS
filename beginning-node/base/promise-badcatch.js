'use strict';

const Q = require('q');

function isAsync(){
	return Q.when(null).then(() => {
		let foo;
		foo.bar;	//Programming eror. Will get caught since wereturn the chain;
	});
}

isAsync().catch(err => {
	let foo; 
	foo.bar;	//Uncaught exception, rejexts the next promise;
});
//But no one is listening to the returned promise;