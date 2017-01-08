//ref: http://requirejs.org/docs/api.html#cjsmodule
define(function(require, exports, module){
	var bar = exports.log = function(){
		console.log('bar.log was called')
	};
});