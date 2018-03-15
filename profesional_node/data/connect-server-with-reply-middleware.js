const app = require('connect')();

//
const reply = require('./reply-text-generator')('Hello Workd from the \
	reply generator');
app.use(reply).listen(8080);
console.log('Connect server listening on port 8080');