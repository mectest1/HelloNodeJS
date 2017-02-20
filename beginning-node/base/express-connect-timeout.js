'use strict';

const {express, PORT} = require('../config/express-app-config');
const timeout = require('connect-timeout');
const TIMEOUT = 5000;	//milliseconds to timeout a request;
const SERVER_ERROR = 500;

let app = express()
		.use('/api', timeout(TIMEOUT), (req, res, next) => {
			//Simulate a haning request by doing nothing;
			}, (error, req, res, next) => {
				if(req.timedout){
					res.statusCode = SERVER_ERROR;
					res.end('Request timed out');
				}else{
					next(error);
				}
			}).listen(PORT);
console.log('server running on PORT', PORT);