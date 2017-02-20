'use strict';

const {express, PORT} = require('../config/express-app-config');

let app = express();
app.param('userId', (req, res, next, userId) => {
	res.write('Looking up user: ' + userId + '\n');
	//simulate a user lookup and 
	//load it into the request object for later middleware
	req.user = {userId: userId};
	next();
});

app.get('/user/:userId', (req, res, next) => {
	res.end('user is: ' + JSON.stringify(req.user));
});

app.listen(PORT);
console.log('server running on port ', PORT);