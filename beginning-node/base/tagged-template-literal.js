
//ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
function tag(strings, ...values){
	console.log(strings[0]);
	console.log(strings[1]);
	console.log(strings[2]);
	console.log(values[0]);
	console.log(values[1]);
	
	return 'Bazinga!';
}

var a = 15;
var b = 20;

console.log(tag`Hello ${a + b} word ${a * b}`);