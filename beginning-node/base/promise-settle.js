'use strict';

const Q = require('q');

let willFulfillDeferred = Q.defer();
let willFulfill = willFulfillDeferred.promise;
willFulfillDeferred.resolve('final value');

willFulfill.then(val => {
	console.log('success with', val); //Only fullfill handler is called
}).catch(reason => {
	console.log('failed with', reason);
});


//
let willRejectDeferred = Q.defer();
let willReject = willRejectDeferred.promise;
willRejectDeferred.reject(new Error('rejection reason'));
willReject.then(val => {
	console.log('success with', val);
}).catch(reason => {
	console.log('failed with', reason);
});