'use strict';

const Q = require('q');

let deferred = Q.defer();
let promise = deferred.promise;

promise.then(val => {
	console.log('Done with', val);
});

deferred.resolve('final value');