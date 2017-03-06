'use strict';

const log = console.log;
function *generator(){
	let bar = yield 'boo';
	log(bar);	//bar
	return 'generator finished';	//the final value;
}

//
let iterator = generator();
//Start execution till we get first yield value;
let foo = iterator.next();
log(foo.value);
//Resume execution with injected 'bar' value
let nextThing = iterator.next('bar');
log(nextThing);