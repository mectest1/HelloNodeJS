'use strict';

const Q = require('q');

function getPromise(){
	let deferred = Q.defer();
			
	//Resolve the promise after a second
	setTimeout(() => {
		deferred.resolve('final value');
	}, 1000);
			
	return deferred.promise;
}

let promise = getPromise();
promise.then((val) => {
	console.log('done with:', val);
});