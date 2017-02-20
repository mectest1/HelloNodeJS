'use strict';

const express = require('express');
const http = require('http');


//Create an express application
let app = express()
//register a middle wire
		.use(function(req, res, next){
			res.end('hello express');
})

//register with http
const PORT = 3000;
http.createServer(app).listen(PORT);
console.log('server running on port ', PORT);