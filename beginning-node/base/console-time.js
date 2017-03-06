'use strict';

console.time();
setTimeout(() => {
	console.timeEnd();	//undefined: 501ms
}, 500);

console.time('first');
setTimeout(() => {
	console.timeEnd('first');	//first: 1001ms
}, 1000);

console.time('second');
setTimeout(() => {
	console.timeEnd('second');	//second: 2001ms
}, 2000);