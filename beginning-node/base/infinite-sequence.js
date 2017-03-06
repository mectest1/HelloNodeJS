'use strict';

const MAX = 10;
function* infiniteSequence(){
	let i = 0;
	while(MAX > i){
		yield i++;
	};
}	//{value: i, done: false/true}

let iterator = infiniteSequence();
let result = {done: false};
while(!result.done){
	result = iterator.next();
	console.log(result.value);
};