//
//console.log('Hello, RequireJS!');
define([
	'./modules/foo',
	'./modules/bar',
	'./modules/server-app-browserified'
], function(foo, bar, amdServer){
	foo();
	bar.log();
});