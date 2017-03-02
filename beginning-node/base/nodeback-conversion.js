'use strict';

function data(delay, cb){
	setTimeout(() => {
		cb(null, 'data');
	}, delay);
}

function error(delay, cb){
	setTimeout(() => {
		cb(new Error('error'));
	}, delay);
}


//Callback style
data(1000, (err, data) => {
	console.log(data);
})
error(1000, (err, data) => {
	console.log(err.message)
});

//Convert to promises;
const Q = require('q');
let dataAsync = Q.nbind(data);
let errAsync = Q.nbind(error);

//Usage
dataAsync(1000).then(data => console.log(data));
errAsync(1000).then(data => {}).catch(err => console.log(err.message));
