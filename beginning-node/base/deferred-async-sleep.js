'use strict';

const Q = require('q');
function sleepAsync(ms){
	let deferred = Q.defer();
	setTimeout(() => {
		deferred.resolve();
	}, ms);
	
	return deferred.promise;
}

console.log('sleep');
sleepAsync(1000).then(() => console.timeEnd('sleep'));