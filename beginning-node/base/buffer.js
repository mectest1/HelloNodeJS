//a string
var str = 'Hello Buffer World!';

const UTF8 = 'utf-8';
//from string to buffer
var buffer = new Buffer(str, UTF8);

//from buffer to String
var roundTrip = buffer.toString(UTF8);
console.log(roundTrip);