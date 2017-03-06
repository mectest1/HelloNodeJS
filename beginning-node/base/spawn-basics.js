'use strict';

const Q = require('q');

Q.spawn(function*(){
	//fulfilled
	let foo = yield Q.when('foo');
	console.log(foo);	//foo
	
	//rejected
	try{
		//A rejected promise will result in a the iterator.throw(rejected_value)
		//get called from within Q.spawn();
		yield Q.reject(new Error('bar'));
	}catch(err){
		console.log(err.message);	//bar
	}
	
});