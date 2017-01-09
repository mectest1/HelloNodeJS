
let bar1 = require('./bar2-1');
let bar2 = require('./bar2.2');

console.log('bar2 module exported through index.js');
bar1();
bar2();