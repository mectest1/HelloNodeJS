'use strict';

//Configurable middleware creator
function greeter(message){
	return function(req, res, next){
		res.end(message);
	};
};

let helloWorldGreeter = greeter('hello, world');
let heyThereGreeter = greeter('hey there');

const connect = require('connect');
const PORT = 3000;
connect()
		.use('/hello', helloWorldGreeter)
		.use('/hey', heyThereGreeter)
		.listen(PORT);
console.log('server running on port ', PORT);