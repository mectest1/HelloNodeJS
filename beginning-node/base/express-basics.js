'use strict';

const express = require('express');
const PORT = 3000;


//Create an express application
express()
//register a middle wire
		.use(function(req, res, next){
			res.end('hello express');
}).listen(PORT);

//register with http
console.log('server running on port ', PORT);