
const connect = require('connect');

//import middlewares
const helloWorld = require('./hell-world-server');

let app = connect();
app.use(helloWorld).listen(8080);
console.log('Connect server running on port 8080');
