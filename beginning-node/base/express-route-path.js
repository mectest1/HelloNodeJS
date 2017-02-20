'use strict';

const {express, PORT} = require('../config/express-app-config');

let app = express();
//Unlike app.use(), which takes a path prefix, the verb-based
//routing in ExpressJS matches the exact path (not exact URL, because
//the query string part is ignored);
app.get('/', (req, res) => {
	res.send('nothing passed in!');
});
app.get(/^\/[0-9]+$/, (req, res, next) => {
	res.send('number!');
});
app.get('/*', (req, res) => {
	res.send('not a number');
});
app.listen(PORT);

console.log('server running on PORT', PORT);