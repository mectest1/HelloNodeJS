'use strict';

const {express, PORT} = require('../config/express-app-config');
const timeout = require('connect-timeout');
const TIMEOUT = 5000;	//milliseconds to timeout a request;

let app = express()
		.use('/api', timeout(TIMEOUT), (req, res, next) => {
			//Simulate a haning request by doing nothing;
}).listen(PORT);
console.log('server running on PORT', PORT);