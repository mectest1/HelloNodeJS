'use strict';

const {express, PORT} = require('../config/express-app-config');

express().
		use('/home', (req, res, next) => {
			console.log('first', req.url);	//GET /home => 'first: /'
			next();
}).use((req, res, next) => {
	console.log('second:', req.url);	//GET /home  => "second: /home'
	res.end('hello');
}).listen(PORT);
console.log('server running on PORT', PORT);