
var t1 = Date.now();
var foo = require('./foo');
console.log('Time used to load module for the first time: ' + (Date.now() - t1));
console.log('bar: module foo loaded.');

foo();

var t2 = Date.now();
var foo2 = require('./foo');
console.log('Time used to load module for the second time: ' + (Date.now() - t2));

foo.bar = 'hello from bar';