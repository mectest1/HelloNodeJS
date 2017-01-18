

const EventEmitter = require('events');

let emitter = new EventEmitter();

emitter.on('removeListener', (name, func) => {
	console.log('listener removed -- ', emitter.listenerCount('foo'), ' listner(s) for event ', name, ' now');
});
emitter.on('newListener', (name, func) => {
	console.log('listener added -- ', emitter.listenerCount(name) + 1, ' - listener added for event ', name);
});

//---

//subscribe
emitter.on('foo', function(arg1, arg2){
	console.log('Foo raised with args: ', arg1, arg2);
	arg1.greetings = 'Greetings from the first listener';
});

let subscriber2 = (arg1) => {
	console.log('Subscriber 2 got notified');
	console.log('arg1.greetings = ', arg1.greetings);
	emitter.removeListener('foo', subscriber2);
};
emitter.on('foo', subscriber2);


emitter.once('foo', ()=>{
	console.log('Subscriber 3: event "foo" has been notified.');
});


console.log('All listeners that have subscribed to event "foo": ', emitter.listeners('foo'));
emitter.emit('foo', {a:123}, {b:456});
console.log('-------------------------');
emitter.emit('foo', 'Hello', 'World');