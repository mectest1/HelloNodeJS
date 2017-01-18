
const EventEmitter = require('events');
//onsole.log(EventEmitter.EventEmitter);


let emitter = new EventEmitter();

let listenersCalled = 0;

function someCallback(){
	emitter.on('foo', () => ++listenersCalled);
}

for(var i = 0; i < 20; ++i){
	someCallback();
}
//
//warning;
//(node:21120) Warning: Possible EventEmitter memory leak detected. 11 foo listeners added. Use emitter.setMaxListeners() to increase limit
//Note: the --trace--warnings command line flag can be used to display the stack trace for such warnings;

//stack trace output:
//(node:21664) Warning: Possible EventEmitter memory leak detected. 11 foo listeners added. Use emitter.setMaxListeners() to increase limit
//    at _addListener (events.js:259:19)
//    at EventEmitter.addListener (events.js:275:10)
//    at someCallback (C:\Users\mtang071\Workspace\NetBeansProjects\HelloNodeJS\beginning-node\base\event-max-listeners.js:11:10)
//    at Object.<anonymous> (C:\Users\mtang071\Workspace\NetBeansProjects\HelloNodeJS\beginning-node\base\event-max-listeners.js:15:2)
//    at Module._compile (module.js:570:32)
 //   at Object.Module._extensions..js (module.js:579:10)
//    at Module.load (module.js:487:32)
//    at tryModuleLoad (module.js:446:12)
//    at Function.Module._load (module.js:438:3)
//    at Module.runMain (module.js:604:10)

emitter.emit('foo');	//warning message: 
//
console.log('listeners called: ', listenersCalled);

//
let foo = {};
foo.self = foo;
console.log('foo.self == foo: ', foo.self == foo);


//
emitter.on('error', (e) => {
	console.log('error detected: ', e);
});
process.on('uncaughtException', (e) => {
	console.log('Global exeption handler: ', e);
});
emitter.emit('error', 'Derp');

console.log('Would this line get executed?');