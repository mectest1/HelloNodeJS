'use strict';

const util = require('util');
const connect = require('connect');
const PORT = 3000;

function logit(req, resp, next){
	util.log(util.format('Request received: %s, %s', req.method, req.url));
	next();
};

function echo(req, resp, next){
	req.pipe(resp);
	next();
}

connect()
		.use(logit)
		.use(echo)
		.listen(PORT);
console.log('server running on port ', PORT);