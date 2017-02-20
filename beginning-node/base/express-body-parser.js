'use strict';

const {express, serveStatic, serveIndex, path, PORT, publicPath, bowerPath} 
		= require('../config/express-app-config');
const bodyParser = require('body-parser');

express()
		.use(bodyParser())
		.use((req, res) => {
			if(req.body.foo){
				res.end('body parsed! value of foo: ' + req.body.foo);
			}else{
				res.end('body does not have foo!');
			}
}).use((err, req, res, next) => {
	res.end('invalid body!')
}).listen(PORT);
console.log('serving', publicPath, 'on port', PORT);
/**
 * Test Data:
 * curl http://localhost:3000 -H 'content-type: application/json' -d '{"foo":123}'
 * curl http://localhost:3000 -H 'content-type: application/json' -d '{"foo":123, }'
 * curl http://localhost:3000 --data-urlencode 'foo=123'
 */