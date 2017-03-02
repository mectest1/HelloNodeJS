'use strict';

const Q = require('q');


let foo = {
	bar: 123,
	bas: function(cb){
		cb(null, this.bar);
	}
};


let basAsync = Q.nbind(foo.bas, foo);
//let basAsync = Q.nbind(foo.bas);
basAsync().then(val => console.log('reesult ->', val));