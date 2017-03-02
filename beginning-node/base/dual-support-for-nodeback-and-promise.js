'use strict';

const Q = require('q');
const fs = require('fs');
const path = require('path');

const readFileAsync = Q.nbind(fs.readFile);
let jsonFile = path.resolve(__dirname, '../config/foo-config.json');
//
function loadJsonAsync(filename, callback){
	return readFileAsync(filename)
			.then(JSON.parse)
			.nodeify(callback);
}

//Use as a promise
loadJsonAsync(jsonFile).then(console.log);
//Use with a callback
loadJsonAsync(jsonFile, (err, val) => console.log('callback', val));