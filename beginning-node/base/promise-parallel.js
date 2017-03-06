'use strict';

const Q = require('q');

//an async function to load an item
let loadItem = Q.nbind(function(id, cb){
	setTimeout(() => {
		cb(null, {id: id});
	}, 500);
});

//
Q.all([loadItem(1), loadItem(2)])
		.then(items => {
			console.log('Items', items);
}).catch(console.log);