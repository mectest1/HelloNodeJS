
var express = require('express');
var path = require('path');
var app = express();
const PORT = 3000;

const serverPath = __dirname;
const bowerPath = path.join(serverPath, '../bower_components');
//console.log(bowerPath);

app.use(express.static(serverPath));
app.use('/bower_components', express.static(bowerPath));

console.log(`serving directiry ${serverPath} with express.js, listening on port ${PORT}`);
app.listen(PORT);