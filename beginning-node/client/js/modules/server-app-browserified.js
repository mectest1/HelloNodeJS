(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var foo = require('./base/foo');
console.log('foo.bar = ' + foo.bar);

var bar = require('./base/bar');
console.log('foo.bar = ' + foo.bar);
},{"./base/bar":2,"./base/foo":3}],2:[function(require,module,exports){

var t1 = Date.now();
var foo = require('./foo');
console.log('Time used to load module for the first time: ' + (Date.now() - t1));
console.log('bar: module foo loaded.')

foo();

var t2 = Date.now();
var foo2 = require('./foo');
console.log('Time used to load module for the second time: ' + (Date.now() - t2));

foo.bar = 'hello from bar';
},{"./foo":3}],3:[function(require,module,exports){

module.exports = function(){
	console.log('a function in file foo');
}
},{}]},{},[1]);
