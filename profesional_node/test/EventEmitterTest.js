
//jasmine EventEmitterTest.js
//Jasmine also has support for runn running specs that require testing asynchronous operations;
//Calls to beforeEach, it, and afterEach can take an optional single argument that should 
//be called when the async work is complete;
describe('Test Suite for EventEmitter in Node ', function(){
	
	const EventEmitter = require('events');
//	class MyEmitter extends EventEmitter{
//		
//	};

//	const errListener = (err) => {
//		console.error('whoops! there was an error');
//		console.error(err);
//	};
//	beforeEach(function(){
//		process.on('uncaughtException', errListener);
//	});
//	afterEach(function(){
//		process.removeListener('uncaughtException', errListener);
//	});	

	xit('shows what will happen when exception is thrown in listener', (done) => {
		const myEmitter = new EventEmitter();
		myEmitter.on('event', () => {
			throw new Error('listener - 1');
		});
		myEmitter.on('error', (error) => {
			console.log('error detected', error);	//<- error thrown on other listener is not caught by this listener
			done();
		});
		console.log('now trigger the event');
		myEmitter.emit('event');
	});

	xit('shows that listener will only be removed when current cycle has finished', (done) => {
		const myEmitter = new EventEmitter();
		
		const callbackA = (flag) => {
			console.log('listener - 1');
			myEmitter.removeListener('event', callbackB);
			console.log('listener 2 removed');
			if('done' === flag){
				done();
			}
		};
		const callbackB = () => {
			console.log('listener - 2');
		};
		
		myEmitter.on('event', callbackA);
		myEmitter.on('event', callbackB);
		
		//callbackA removes listener callbackB but it will still be called;
		//Internal array at time of emit: [callbackA, callbackB];
		console.log('emit event for the first time');
		myEmitter.emit('event');
		console.log('emit event for the second time');
		myEmitter.emit('event', 'done');
		
	});
	xit('shows that function can be disabled from invoked as constructor', () => {
		function NotAConstructor(){
			if(this.constructor === NotAConstructor){	//Object.prototype.constructor
				console.log('This function is invoked with the "new" operator')
				throw new TypeError();
			}
		}
		function invocation(){
			let obj = new NotAConstructor();
		}
		expect(invocation).toThrowError(TypeError);
	});
	xit('shows that listener prepended can be invoked only once', (done) => {
		const myEmitter = new EventEmitter();
		
		myEmitter.on('event', (times) => {
			console.log('listener - 1');
			if(2 === times){
				done();
			}
		});
		myEmitter.prependOnceListener('event', (times) => {
			console.log('listener - 2');
		});
		console.log('emit event for the first time');
		myEmitter.emit('event', 1);
		console.log('emit event for the second time');
		myEmitter.emit('event', 2);
		
	});
	xit('shows that listeners can be appened as well as prepended', (done) => {
		const myEmitter = new EventEmitter();
		
		myEmitter.on('event', () => console.log('listener 1'));
		myEmitter.on('event', () => {
			console.log('listener 2');
			done();
		});
		myEmitter.prependListener('event', () => console.log('listener 3'));
		myEmitter.emit('event');
		expect(myEmitter.listeners('event').length).toEqual(3);
	});
	xit('show that we can get all listeners for a specific event name', () => {
		const myEmitter = new EventEmitter();
		myEmitter.on('event', () => console.log('listener 1'));
		
		myEmitter.on('event', () => console.log('listener 2'));
		expect(myEmitter.listeners('event').length).toEqual(2);
		console.log('listeners for "event" ', myEmitter.listeners('event'));
	});

	xit('shows that we can get all event names for event emitter', () => {
		const myEmitter = new EventEmitter();
		
		myEmitter.on('foo', () => {});
		myEmitter.on('bar', () => {});
		
		
		const sym = Symbol('eventName');
		myEmitter.on(sym, () => {});
		
		console.log(myEmitter.eventNames());
		expect(myEmitter.eventNames().length).toEqual(3);
	});

	xit('shows that we will get warning message when too much listeners are added', (done) => {
		process.on('warning', (warningObj) => {
			console.log('warning message received');
			console.log(warningObj);
			done();
		});
		
		const myEmitter = new EventEmitter();
		for(let i = 0; i < myEmitter.getMaxListeners() + 1; ++i){
			myEmitter.on('event', () => {});
		}
	});

	xit('show that max number of event listeners can be registered for an single event', () => {
		const maxNum = EventEmitter.defaultMaxListeners;
		
		const myEmitter = new EventEmitter();
		const singleNum = myEmitter.getMaxListeners();
		console.log('global max listener num: ' + maxNum);
		expect(maxNum).toEqual(singleNum);
	});
	xit('shows that removeListener listener runs after the listener is removed', function(){
		const myEmitter = new EventEmitter();
		
		//
		myEmitter.on('removeListener', (eventName, listener) => {
			if('event' === eventName){
				
				console.log('"event" listener removed. now there are ' + 
						myEmitter.listenerCount(eventName) + ' listener(s)'
				);
			}
		});
		const l1 = () => {console.log('listener-1 listening')};
		const l2 = () => {console.log('listener-2 listening')};
		myEmitter.on('event', l1);
		myEmitter.on('event', l2);
		console.log('emit event for the first time');
		myEmitter.emit('event');
		expect(myEmitter.listenerCount('event')).toEqual(2);
		myEmitter.removeListener('event', l1);
		expect(myEmitter.listenerCount('event')).toEqual(1);
		myEmitter.removeListener('event', l2);
		expect(myEmitter.listenerCount('event')).toEqual(0);
		console.log('emit event again');
		myEmitter.emit('event');
	});
	xit('show that newListener listener runs before the listener is added', function(){
		const myEmitter = new EventEmitter();
		
		//Only do this once so that we don'e loop forever
		myEmitter.once('newListener', (eventName, listener) => {
			if('event' === eventName){
				myEmitter.on(eventName, () => {
					console.log('B');
				});
			}
		});
		myEmitter.on('event', () => {
			console.log('A');
		});
		myEmitter.emit('event');
	});

	xit('shows that "error" events should be processed properly', function(){
		const myEmitter = new EventEmitter();
		//process.on('uncaughtException', errListener);
		
		myEmitter.on('error', (err) => {
			console.log('whoops! there was an error');
		});
		
		myEmitter.emit('error', new Error('whoops!'));
		//throws and crashes Node.js
		
	});
	xit('shows that it can handle events only once', function(){
		const myEmitter = new EventEmitter();
		let m = 0, n = 0;
		myEmitter.on('event', () => {
			console.log('onEvent detected for ' + (++m) + ' time(s)');
		});
		myEmitter.once('onceEvent', () => {
			console.log('onceEvent detected for ' + (++n) + ' time(s)');
		});
		[1, 2, 3, 4].forEach(e => myEmitter.emit('event'));
		[1, 2, 3, 4].forEach(e => myEmitter.emit('onceEvent'));
	});
	xit('shows that asynchronouse listener execution can be toggled on with setImmediate/setTimeout \
		or process.nextTick() methods', function(done){
		const myEmitter = new EventEmitter();
		myEmitter.on('event', (a, b) => {
			setTimeout(() => {
				console.log('event detected');
				console.log('this happends asynchronously');
				console.log('received parameters', a, b);
				done();	//this done() is required to finish current asynchronous test spec
			});
		});
		myEmitter.emit('event', 'a', 'b');
	});
	xit('show that when use arrow functions as listener, the "this" keyword will no \
		longer reference the EventEmitter instance', function(){
		const myEmitter = new EventEmitter();
		myEmitter.on('event', (a, b) => {
			console.log('event detected');
			console.log(a, b, this);
		});
		myEmitter.emit('event', 'a', 'b');
	});
	xit('can pass arguments to the event listener', function(){
		const myEmitter = new EventEmitter();
		
		myEmitter.on('event', function(a, b){
			console.log('evnt detected');
			console.log(a, b, this);
		});
		myEmitter.emit('event', 'a', 'b');
	});
	
	xit('checks the listener registration & trigger mechanism', function(){
		const myEmitter = new class extends EventEmitter{
//			constructor(name){
//				//this.name = name;
//			}
			hello(){
				console.log('hello from myEmitter: '// + this.name
				);
			}
		};
		
		myEmitter.hello();
		
		myEmitter.on('event', () => {
			console.log('an event occurred');
		});
		myEmitter.emit('event');
	});
	
	
	xit('FileSystem uses just this pattern', (done) => {
		const fs = require('fs');
		fs.readFile('./EventEmitterTest.js', (err, fileContent) => {
			if(err){
				throw err;
			}
			console.log('file content', fileContent.toString());
			done();
		});
	});
});