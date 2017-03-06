'use strict';

const log = console.log;
function *generator(){
	try{
		yield 'foo';
	}catch(err){
		console.log(err.message);
	}
	return 'generator finished';
}

//
let iterator = generator();
//Start execution till get first yield value;
let foo = iterator.next();
log(foo.value);
//Resume execution throwing an exceptino 'bar';
let nextThing = iterator.throw(new Error('bar'));
log(nextThing);