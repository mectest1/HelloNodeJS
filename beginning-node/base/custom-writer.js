'use strict';

const Writable = require('stream').Writable;
const util = require('util');

function Logger(options){
	if(!this instanceof Logger){
		return new Logger(options);
	}
	Writable.call(this, options);
}
util.inherits(Logger, Writable);

//
Logger.prototype._write = function(chunk){
	console.log(chunk.toString());
}

//Usage, same as any othe rWritable stream
let logger = new Logger();

let readStream = require('fs').createReadStream(__filename);
readStream.pipe(logger);
