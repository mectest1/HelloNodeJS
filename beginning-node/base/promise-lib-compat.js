'use strict';

//
const Q = require('q');
const BlueBird = require('bluebird');

new BlueBird( resolve => {	//A bluebird promise
	resolve('foo');
}).then(val => {
	console.log(val);	//foo;
	return Q.when('bar');	//a q promise
}).then(console.log);