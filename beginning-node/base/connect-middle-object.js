'use strict';

const echo = {
	handle: function(req, res, next){
		req.pipe(res);
	}
};

const connect = require('connect');
const PORT = 3000;

connect()
		.use(echo)
		.listen(PORT);
console.log('server running on port ', PORT);