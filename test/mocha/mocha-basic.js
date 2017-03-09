'use strict';

//jasmine mocha-basic.js
//mocha mocha-basic.js


const assert = require('assert');

//
describe('out test suite', function(){
	it('should pass this test', () => {
		assert.equal(1, 1, '1 should be equal to 1');
	});
	
	it('should pass this test', () => {
		assert.notEqual(1, 0, '1 should be equal to 0');
	});
});