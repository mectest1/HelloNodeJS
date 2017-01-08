
var fs = require('fs');
var path = require('path');

const filePath = path.join(__dirname, '../data/test.txt').toString();
//write
fs.writeFileSync(filePath, 'Hello fs!');

//read
console.log(fs.readFileSync(filePath).toString());