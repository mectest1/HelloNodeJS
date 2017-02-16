'use strict';
const connect = require('connect');
const PORT = 3000;
//Create a connect dispatcher and register with http
let app = connect()
		//register a middleware
				.use((req, resp, next) => next())
				.listen(PORT);
		
console.log('server running on port ', PORT);