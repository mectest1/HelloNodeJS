'use strict';

const Q = require('q');
const fs = require('fs');
const path = require('path');

let readFileAsync = Q.nbind(fs.readFile);
let jsonFile = path.resolve(__dirname, '../config/foo-config.json');
let textFile = path.resolve(__dirname, '../data/test.txt');
//let jsonFile = path.resolve('../config/foo-config.json');	//Nope
//console.log(jsonFile);

function loadJsonAsync(fileName){
	return readFileAsync(fileName)
			.then(res => JSON.parse(res));
}


//good json file
loadJsonAsync(jsonFile)
		.then(val => console.log('good.json content: ' + JSON.stringify(val)))
		.catch(err => console.log('json file error', err.message))	//never called;
//Tset non-existent json file
		.then(() => loadJsonAsync('absent.json'))
		.then(val => console.log(val))	//never called
		.catch(err => console.log('absent.json error', err.message))
//Invalid json file
		.then(() => loadJsonAsync(textFile))
		.then(val => console.log(val))
		.catch(err => console.log('bad.json error', err.message))
;
