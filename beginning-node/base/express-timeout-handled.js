'use strict';

const {express, PORT} = require('../config/express-app-config');
const timeout = require('connect-timeout');
const TIMEOUT = 1000;

let app = express()
		.use(timeout(TIMEOUT))
		.use((req, res, next) => {
			//simulate database action that takes 2s
			setTimeout(() => {
				next();
			}, 2 * TIMEOUT);
		}).use(haltOnTimedout)
		.use((req, res, next) => {
			res.end('Done');
		})
		.listen(PORT);
		
function haltOnTimedout(req, res, next){
	if(!req.timedout){
		next();
	}
	
}
console.log('server running on port', PORT);