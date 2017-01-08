
var path = require('path');

console.log(path.normalize('/foo/bar/..'))


console.log(path.normalize('/foo//bar/bars/..'));

console.log(path.join('foo', '/bar', 'bas'));

//
let completePath = '/foo/bar/bars.html';
console.log(`Let's analyze the full path: ${completePath}`);
console.log(`dirname: ${path.dirname(completePath)}`);
console.log(`basename: ${path.basename(completePath)}`);
console.log(`extname: ${path.extname(completePath)}`);