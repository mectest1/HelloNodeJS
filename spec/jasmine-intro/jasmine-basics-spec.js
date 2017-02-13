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
});