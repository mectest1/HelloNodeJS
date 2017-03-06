'use strict';

const log = console.log;
function *generator(){
	log('Execution started');
	yield 0;
	log('Execution resumed');
	yield 1;
	log('Execution resumed');
}

let iterator = generator();
log('Starting iteration');
log(iterator.next());
log(iterator.next());
log(iterator.next());
