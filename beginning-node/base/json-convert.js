
let foo={
	a: 1,
	b: 'a String',
	c: true
};

//convert a JavaScript object to a string
var json = JSON.stringify(foo);
console.log(json);
console.log(typeof json);

//convert a JSON string to a  JavaScript object
var backToJs = JSON.parse(json);
console.log(backToJs);
console.log(backToJs.a);