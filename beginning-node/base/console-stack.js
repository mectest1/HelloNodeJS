'use strict';

function foo(){
	let stack = new Error('trace at foo').stack;
	
	console.log(stack);
	
	//Execution continues;
	console.log("Stack trace printed");
}

function bar(){
	foo();
}

bar();