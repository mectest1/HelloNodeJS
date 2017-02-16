'use strict';

function echo(req, res, next){
	req.pipe(res);
	//next();
}

const connect = require('connect');
const PORT = 3000;

connect()
		.use('/echo', echo)
		.use((req, res) => {
			res.end('Wassup!')
		})
		.listen(PORT);
console.log('server running on port ', PORT);