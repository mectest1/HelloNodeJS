
var p = new Promise(function(resolve, reject){
	console.log('Promise executed');
	resolve();
});

p.then(function(val){
	console.log('Promise resolved');
})