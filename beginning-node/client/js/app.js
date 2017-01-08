//
//console.log('Hello, RequireJS!');
define([
	'./modules/foo',
	'./modules/bar'
], function(foo, bar){
	foo();
	bar.log();
});