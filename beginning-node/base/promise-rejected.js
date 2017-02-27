'use strict';

const Q = require('q');

Q.reject(new Error('denied'))
		.catch(err => {
			console.log(err.message);//denied;
});