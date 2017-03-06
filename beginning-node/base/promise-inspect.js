'use strict';

const Q = require('q');

let p1 = Q.defer().promise;	//pending;
let p2 = Q.when('fullfill');	//fulfileld;
let p3 = Q.reject(new Error('reject'));	//rejected
const log = console.log;

process.nextTick(() => {
	log(p1.isPending());
	log(p2.isFulfilled());
	log(p3.isRejected());
	
	log(p1.inspect());
	log(p2.inspect());
	log(p3.inspect());
});