'use strict';

const Q = require('q');

//An async function to load an item
let loadItem = Q.nbind(function(id, cb){
	setTimeout(() => {
		cb(null, {id: id});
	}, 500);	//simulate delay
});

//
//An async function to load items;
let loadItems = Q.async(function*(ids){
	let items = [];
	for(let i = 0; i < ids.length; ++i){
		items.push(yield loadItem(ids[i]));
	}
	return items;
});	//Q.async returns a promise


//
Q.spawn(function*(){
	console.log(yield loadItems([1, 2, 3]));
});

/**
 * Note: When you're running in the root level of your application, use Q.spawn (this is 
 * similar to using the promise.done function). WHen you're authoring a function, that is,
 * writing code to return a result, just wrap the function in Q.async.
 */