'use strict';

const Readable = require('stream').Readable;
const util = require('util');

function Counter(options){
	if(!this instanceof Counter){
		return new Counter(options);
	}
	Readable.call(this, options);
	
	this._max = 1000;
	this._index = 1;
}
util.inherits(Counter, Readable);
Counter.prototype._read = function(){
	let i = this._index++;
	if(i > this._max){
		this.push(null);
	}else{
		this.push(' ' + i);
	}
};

//Usage example:
let counter = new Counter();
counter.pipe(process.stdout);
