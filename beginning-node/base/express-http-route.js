'use strict';

const {express, PORT} = require('../config/express-app-config');

let app = express();
app.route('/')
		.all((req, res, next) => {
			res.write('all\n');
			next();
		}).get((req, res, next) => {
			res.end('get');
		}).put((req, res, next) => {
			res.end('put');
		}).post((req, res, next) => {
			res.end('post');
		}).delete((req, res, next) => {
			res.end('delete');
		});
app.listen(PORT);
console.log('server running on PORT', PORT);