describe('Introduction to Jasmine', function(){
	'use strict';
	
	describe('A Suite', function(){
		it('contains spec with an expectation', function(){
//			expect(true).toBe(false);
			expect(true).toBe(true);
		});
	});
	
	
	//
	describe('A suite is just a function', () => {
		let a;
		
		it('and so is a spec', ()=>{
			a = true;
			expect(a).toBe(true);
		});
	});
	
	
	//
	describe('The "toBe" matcher compares with ===', function(){
		it('and has a positive case', function(){
			expect(true).toBe(true);
		});
		
		it('and can have a negative case', function(){
			expect(false).not.toBe(true);
		});
		
	});



	describe('Included matchers:', function(){
		it('The "toBe" matcher compares with ===', function(){
			let a = 12;
			let b = a;
			
			expect(a).toBe(b);
			expect(a).not.toBe(null);
		});
		
		describe('The "toEqual" matcher', function(){
			it('works for simple literals and variables', function(){
				let a = 12;
				expect(a).toEqual(12);
			});
			
			it('should work for objects', function(){
				let foo = {
					a: 12,
					b: 34
				};
				let bar = {
					'a': 12,
					'b': 34
				};
				expect(foo).toEqual(bar);
			});
			
		});
		
		it('The "toMatch" matcher is for regular expression', function(){
			let message = 'foo bar baz';

			expect(message).toMatch(/bar/);
			expect(message).toMatch('bar');
			expect(message).not.toMatch(/quux/);
		});

		it('The "toBeDefined" matcher compares against "undefined"', function(){
			let a = {
				foo: 'foo'
			};

			expect(a.foo).toBeDefined();
			expect(a.bar).not.toBeDefined();
		});

		//
		it('The "toBeUndefined" matcher compare against "undefined"', function(){
			let a = {
				foo: 'foo'
			};

			expect(a.foo).not.toBeUndefined();
			expect(a.bar).toBeUndefined();
		});


		//
		it('The "toBeNull" matcher compares against null', function(){
			let a = null;
			let foo = 'foo';

			expect(null).toBeNull();
			expect(a).toBeNull();
			expect(foo).not.toBeNull();
		});

		//
		it('The "toBeTruthy" matcher is for boolean casting testing', function(){
			let a, foo = 'foo';

			expect(foo).toBeTruthy();
			expect(a).not.toBeTruthy();
		});


		it('The "toBeFalsy" matcher is for boolean casting testing', function(){
			let a, foo = 'foo';

			expect(a).toBeFalsy();
			expect(foo).not.toBeFalsy();
		});

		describe('The "toContain" matcher', function(){
			it('works for finding an item in an Array', function(){
				let a = ['foo', 'bar', 'baz'];

				expect(a).toContain('bar');
				expect(a).not.toContain('quux');
			});

			it('also works for finding a substring', function(){
				let a = 'foo bar baz';

				expect(a).toContain('bar');
				expect(a).not.toContain('quux');
			});
		});

		it('The "toBeLessThan" matcher is for mathematical comparisons', function(){
			const pi= 3.1415926, e = 2.78;

			expect(e).toBeLessThan(pi);
			expect(pi).not.toBeLessThan(e);
		});


		it('The "toBeGreaterThan" matcher is for mathematical comparisons', function(){
			const pi= 3.1415926, e = 2.78;

			expect(pi).toBeGreaterThan(e);
			expect(e).not.toBeGreaterThan(pi);
		});

		//
		it('The "toBeCloseTo" matcher is for precision with comparison', function(){
			const pi = 3.1415926, e = 2.78;

			expect(pi).not.toBeCloseTo(e, 2);	//compare: function(actual, expected, precision);
												//pass: Math.abs(expected - actual) < Math.pow(10, precision)/2
			expect(pi).toBeCloseTo(e, 0);
		});

		//
		it('The "toThrow" matcher is for testing if a function throws an expection', function(){
			let foo = function(){
				return 1 + 2;
			};
			let bar = function(){
				return a + 1;	//throw 'Undefined variable'
			};
			let baz  = function(){
				throw 'what';
			};

			expect(foo).not.toThrow();
			expect(bar).toThrow();
			expect(baz).toThrow('what');
		});

		//
		it('The "toThrowError" matcher is for testing a specific thrown exception', function(){
			let foo = function(){
				throw new TypeError('foo bar baz');	
			};

			expect(foo).toThrowError('foo bar baz');
			expect(foo).toThrowError(/bar/);
			expect(foo).toThrowError(TypeError);
			expect(foo).toThrowError(TypeError, 'foo bar baz');
		});
	}); //included matches end
	
	describe('A spec using the fail function', function(){
		function foo(x, callBack){
			if(x){
				callBack();
			}
		}
		
		it('should not call the callBack', function(){
			foo(false, function(){
				fail('Callback has been called!');
			});
		});
	});
	
	//Grouping related specs wiht 'describe'
	describe('A spec', function(){
		it('is just a function, so it can contain any code', function(){
			let foo = 0;
			foo += 1;
			
			expect(foo).toEqual(1);
		});
		
		it('can have more than on expectations', function(){
			let foo = 0;
			foo += 1;
			
			expect(foo).toEqual(1);
			expect(true).toEqual(true);
		});
	});
	
	
	//
	describe('A spec suite uusing beforeEach and afterEach', function(){
		let foo = 0;
		
		beforeEach(function(){
			foo += 1;
		});
		
		afterEach(function(){
			foo -=1;
		});
		
		//
		it('is just a function, so it can contain any code', function(){
			expect(foo).toEqual(1);
		});
		
		it('can have more than one expectation', function(){
			expect(foo).toEqual(1);
			expect(true).toEqual(true);
		});
	});
	
	//
	describe('A spec using beforeAll and afterAll', function(){
		let foo;
		
		beforeAll(function(){
			foo = 1;
		});
		
		
		afterAll(function(){
			foo = 0;
		});
		
		it('sets the initial value of foo before spec run', function(){
			expect(foo).toEqual(1);
			foo += 1;
		});
		
		it('does not reset foo between specs', function(){
			expect(foo).toEqual(2);
		});
	});
	
	
	//
	describe('States can be shared between beforeEach/it/afterEach with "this"', function(){
		beforeEach(function(){
			this.foo = 0;
		});
		
		it('can use the "this" to share state', function(){
			expect(this.foo).toEqual(0);
			this.bar = 'test pollution';
		});
		
		it('prevents test pollution by having an empty "this" created for the next spec', function(){
			expect(this.foo).toEqual(0);
			expect(this.bar).toBeUndefined();
		});
	});
	
	//
	describe('A spec', function(){
		let foo;
		
		beforeEach(function(){
			foo = 0; 
			foo += 1;
		});
		
		afterEach(function(){
			foo = 0;
		});
		
		it('is just a function, so it can contain any code', function(){
			expect(foo).toEqual(1);
		});
		
		it('can have more than one expectation', function(){
			expect(foo).toEqual(1);
			expect(true).toEqual(true);
		});
		
		
		describe('nested inside a second suite description', function(){
			let bar ;
			
			beforeEach(function(){
				bar = 1;
			});
			
			it('can reference both scopes as needed', function(){
				expect(foo + bar).toEqual(2);
			});
		});
		
	});
	
	//Disabling Suites
	xdescribe('A disabled suite', function(){
		let foo;
		
		beforeEach(function(){
			foo = 0;
			foo += 1;
		});
		
		it('is just a function, so it can contain any code', function(){
			expect(foo).toEqual(1);
		});
	});
	
	//
	describe('Pending specs', function(){
		xit('can be declared "xit"', function(){
			expect(true).toBe(true);
		});
		
		it('can be declared with "it" but without a function');
		
		it('can be declared by calling "pending" in the spec body', function(){
			expect(true).toBe(false);
			pending('pending reason put here. (pend the test no matter the expectations');
		});
	});
	
	//Spies (Mocks in Jasmine)
	describe('A spy (mock)', function(){
		let foo, bar = null;
		
		beforeEach(function(){
			foo = {
				setBar: function(value){
					expect('setBar[1] to be called');
					bar = value;
				}
			};

			//
			spyOn(foo, 'setBar');	//mock method foo.setBar
				//Note: the actually method will not be invoked unless
				//and.callThrough() is called.

			foo.setBar(123);
			foo.setBar(456, 'another param');
		});
		
		//
		it('trackes that the spy was called', function(){
			expect(foo.setBar).toHaveBeenCalled();
		});

		it('tracks that the spy was called X times', function(){
			expect(foo.setBar).toHaveBeenCalledTimes(2);
		});
		
		it('tracks all the arguments of its calls', function(){
			expect(foo.setBar).toHaveBeenCalledWith(123);
			expect(foo.setBar).toHaveBeenCalledWith(456, 'another param');
		});
		
		it('shows that the actual function will not get executed', function(){
			expect(bar).toBeNull();
		});
	});
	
	describe('A spy(mock), when configured to call through', function(){
		let foo, bar, fetchedBar;
		
		beforeEach(function(){
			foo = {
				setBar: function(value){
					bar = value;
				},
				getBar: function(){
					return bar;
				}
			};
			
			//
			spyOn(foo, 'getBar').and.callThrough();
			
			foo.setBar(123);
			fetchedBar = foo.getBar();
		});
		
		//
		it('tracks that the spy was called', function(){
			expect(foo.getBar).toHaveBeenCalled();
		});
		
		it('shows that the actual function was called', function(){
			expect(bar).toEqual(123);
		});
		
		it('tracks the returned value', function(){
			expect(fetchedBar).toEqual(123);
		});
	});
	
	
	//
	describe('Use a spy (mock) object to return value', function(){
		let foo, bar, fetchedBar;
		
		beforeEach(function(){
			foo = {
				setBar: function(value){
					//console.log('setBar called.');
					bar = value;
				},
				getBar: function(){
					return bar;
				}
			};
			
			//
			spyOn(foo, 'getBar').and.returnValue(745);
			
			foo.setBar(123);
			fetchedBar = foo.getBar();
		});
		
		it('tracks that the spy was called', ()=> {
			expect(foo.getBar).toHaveBeenCalled();
		});
		it('should not affect other functions', function(){
			expect(bar).toEqual(123);
		});
		it('when called, returns the reuqirested value', function(){
			expect(fetchedBar).toEqual(745);
		});
	});
	
	//
	describe('A spy(mock), when configured to take a series of return values', function(){
		let foo, bar;
		
		beforeEach(function(){
			foo = {
				setBar: function(value){
					bar = value;
				},
				getBar: function(){
					return bar;
				}
			};
			
			spyOn(foo, 'getBar').and.returnValues('fetched first', 'fetched second');
			
			foo.setBar(123);
		});
		
		it('tracks that the spy was called', function(){
			foo.getBar(123);
			expect(foo.getBar).toHaveBeenCalled();
		});
		
		it('should not affect other functions -- since foo.setBar was not spied on', function(){
			expect(bar).toEqual(123);
		});
		
		it('when called multiple times returns the requested values in order', function(){
			expect(foo.getBar()).toEqual('fetched first');
			expect(foo.getBar()).toEqual('fetched second');
			expect(foo.getBar()).toBeUndefined();
		});
	});
	
	//By chaining the spy with and.callFake, all calls to the spy 
	//will delegate to the supplied function
	describe('A spy (mock), when configured with an alternate implementation', function(){
		let foo, bar, fetchedBar;
		
		beforeEach(function(){
			foo = {
				setBar: function(value){
					bar = value;
				},
				getBar: function(){
					return bar;
				}
			};
			
			
			spyOn(foo, 'getBar').and.callFake(function(args, can, be, received){
				if(0 < arguments.length){
					//Use spread operator to convert arguments into an Array
					//ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator
					return [...arguments].join();
				}
				return 1001;
			});
			
			foo.setBar(123);
			fetchedBar = foo.getBar();
		});
		
		it('tracks that the spy was called', function(){
			expect(foo.getBar).toHaveBeenCalled();
		});
		
		it('should not affect other functions', function(){
			expect(bar).toEqual(123);
		});
		
		it('when called returns the requested value', function(){
			expect(fetchedBar).toEqual(1001);
		});
		
		it('also means that delegate function can receive arguments', function(){
			expect(foo.getBar('hello', 'world')).toEqual('hello,world');
		});
		
	});
	
	//By chaining the spy with and.throwError, all calls to the spy will throw the specified value as en error
	describe('A spy, when configured to throw an error', function(){
		let foo, bar;
		
		beforeEach(function(){
			foo = {
				setBar: function(value){
					bar = value;
				}
			};
			
			spyOn(foo, 'setBar').and.throwError('quux');
		});
		
		it('throws the value', function(){
			expect(function(){
				foo.setBar(123);
			}).toThrowError('quux');
		});
	});
	
	//When a calling strategy is used for a spy, the original stubbing behavior
	//can be returned at any time with and.stub
	describe('A spy', function(){
		let foo, bar = null;
		
		beforeEach(function(){
			foo = {
				setBar: function(value){
					bar = value;
				}
			};
			
			//the and.callThrough strategy is leveraged here.
			spyOn(foo, 'setBar').and.callThrough();
		});
		
		it('can call through and then stub in the same spec', function(){
			foo.setBar(123);
			expect(bar).toEqual(123);
			
			//Reset to the original default calling strategy
			//which basically embodies an empty function body
			foo.setBar.and.stub();
			bar = null;
			
			//
			foo.setBar(123);
			expect(bar).toBe(null);
		});
		
	});
	
	
	//Other tracking properties:
	//Every call to a spy is tracked and exposed on the 'calls' property
	describe('A spy(mock) object info is tracked and exposed on the "calls" property', function(){
		let foo, bar = null;
		
		beforeEach(function(){
			foo = {
				setBar: function(value){
					bar = value;
				}
			};
			
			spyOn(foo, 'setBar');
		});
		
		it('tracks if it was called at all', function(){
			expect(foo.setBar.calls.any()).toEqual(false);
			
			foo.setBar();
			
			expect(foo.setBar.calls.any()).toEqual(true);
		});
		
		
		it('tracks the number of times it was called', function(){
			expect(foo.setBar.calls.count()).toEqual(0);
			
			foo.setBar();
			foo.setBar();
			
			expect(foo.setBar.calls.count()).toEqual(2);
		});
		
		it('tracks the arguments of each call', function(){
			foo.setBar(123);
			foo.setBar(456, 'baz');
			
			expect(foo.setBar.calls.argsFor(0)).toEqual([123]);
			expect(foo.setBar.calls.argsFor(1)).toEqual([456, 'baz']);
		});
		
		it('tracks the arguments of all calls', function(){
			foo.setBar(123);
			foo.setBar(456, 'baz');
			
			expect(foo.setBar.calls.allArgs()).toEqual([
				[123],
				[456, 'baz']
			]);
		});
		
		it('can provide the context and arguments to all calls', function(){
			foo.setBar(123);
			
			expect(foo.setBar.calls.all()).toEqual([{
				object: foo,
				args: [123],
				returnValue: undefined
			}]);
		});
		
		
		it('has a shortcut to the most recent call', function(){
			foo.setBar(123);
			foo.setBar(456, 'baz');
			
			expect(foo.setBar.calls.mostRecent()).toEqual({
				object: foo,
				args: [456, 'baz'],
				returnValue: undefined
			});
		});
		
		it('has a shortcut to the first call', function(){
			foo.setBar(123);
			foo.setBar(456, 'baz');
			
			expect(foo.setBar.calls.first()).toEqual({
				object: foo,
				args: [123],
				returnValue: undefined
			});
		});
		
		it('tracks the context', function(){
			let spy = jasmine.createSpy('spy');
			let baz = {
				fn: spy
			};
			let quux = {
				fn: spy
			};
			
			baz.fn(123);
			quux.fn(456);
			
			expect(spy.calls.first().object).toBe(baz);
			expect(spy.calls.mostRecent().object).toBe(quux);
		});
		
		it('can be reset (clars all tracking for a spy', function(){
			foo.setBar(123);
			foo.setBar(456, 'baz');
			
			//
			expect(foo.setBar.calls.any()).toBe(true);
			
			//
			foo.setBar.calls.reset();
			expect(foo.setBar.calls.any()).toBe(false);
		});
	});
	
	//When there is not a function to spy on, jasmine.createSpy can 
	//create a "bare" spy. This spy acts as any other spy - tracking calls, arguments, etc.
	//But ther eis no implementation behind it.
	//Spies are JavaScript objects and can be used as such.
	describe('A spy (mock), when created manually', function(){
		let whatAmI;
		
		beforeEach(function(){
			whatAmI = jasmine.createSpy('whatAmI');
			
			whatAmI('I', 'am', 'a', 'spy');
		});
		
		it('is named, which helps in error reporting', function(){
			expect(whatAmI.and.identity()).toEqual('whatAmI');
		});
		
		it('tracks that the spy wascalled', function(){
			expect(whatAmI).toHaveBeenCalled();
		});
		
		it('tracks its number of calls', function(){
			expect(whatAmI.calls.count()).toEqual(1);
		});
		
		it('tracks all the arguments of its calls', function(){
			expect(whatAmI).toHaveBeenCalledWith('I', 'am', 'a', 'spy');
		});
		
		it('allows access to the most recent call', function(){
			expect(whatAmI.calls.mostRecent()).args[0].toEqual('I');
		});
	});
	
	//In order to create a mock with multiple spies, use
	//jasmine.createSpyObj and pass an array of strings. It returns 
	//an object that has a property for each string that is a spy.
	
});