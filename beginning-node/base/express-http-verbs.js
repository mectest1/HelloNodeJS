'use strict';

const {express, PORT} = require('../config/express-app-config');

let app = express();
app.all('/', (req, res, next) => {
	res.write('all\n');
	next();
});
app.get('/', (req, res, next) => {
	res.end('get');
});
app.put('/', (req, res, next) => {
	res.end('put');
});
app.post('/', (req, res, next) => {
	res.end('post');
});
app.delete('/', (req, res, next) => {
	res.end('delete');
});
app.listen(PORT);
console.log('server running on port', PORT);
