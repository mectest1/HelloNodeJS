
//jasmine CircleTest.js
describe('Tests the Circle module', function(){
	it('calculates circle.care', function(){
		const CircleModule = require('../circle');
		const {Circle} = CircleModule;
		const print = console.log;

		let c1 = new Circle(10, 5, 12);
		print('Circle.area = ' + c1.area);
		//expect(c1.area).toEqual(Math.PI * 12 * 12);
		expect(c1.area).toBeCloseTo(Math.PI * 12 * 12, 5);
		
	});
});
