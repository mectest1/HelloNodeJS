'use strict';

const connect = require('connect');
const http = require('http');

//Creat a connect dispatcher
const PORT = 3000;
let app = connect();	//connect().listen(PORT);

//Register with http
http.createServer(app).listen(3000);
console.log('Server running on port ', PORT);