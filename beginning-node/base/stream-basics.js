'use strict';

let fs = require('fs');
let path = require('path');


//Create a readable stream
const currentFile = __filename;
let readableStream = fs.createReadStream(currentFile);
console.log('reading & outputing current js file: ', currentFile);

//Pipe it to stdout
readableStream.pipe(process.stdout);

function gzipCurrentFile(){
	let gzip = require('zlib').createGzip();
	let inp  = fs.createReadStream(currentFile);
	
//	const outFile = path.join(currentFile, '.gz');
	const outFile = __filename + '.gz';
	let out = fs.createWriteStream(outFile);
	
	//Pip chain
	inp.pipe(gzip).pipe(out);
	console.log(outFile, ' created');
}
//console.log('Current file gzipped.');
//gzipCurrentFile();