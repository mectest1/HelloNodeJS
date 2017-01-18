
const util = require('util');
let inherits = util.inherits;

function Animal(name){
	this.name = name;
}

Animal.prototype.walk = function(destination){
	console.log(this.name, 'is walking to', destination);
};

let animal = new Animal('elephant');
animal.walk('Melbourne');

//
function Bird(name){
	Animal.call(this, name);	//Call the super constructor
	//
}
//Bird.prototype.__proto__ = Animal.prototype;	//extend class
Object.setPrototypeOf(Bird.prototype, Animal.prototype);
Bird.prototype.fly = function(destination){
	console.log(this.name, 'is flying to ', destination);
}


let bird = new Bird('Bird');
bird.walk('London');
bird.fly('Melbourne');


function Foo(){}

let foo = new Foo();
console.log(foo.constructor.name);
console.log(foo.constructor === Foo);


//---------------------
function Bird2(name){
	Animal.call(this, name);
}
inherits(Bird2, Animal);	//Discouraged by Node



//----------------------
function Bird3(name){
	Animal.call(this, name);
}
//Object.setPrototypeOf(Bird.prototype, Animal.prototype);
Bird3.prototype = Object.create(Animal.prototype, {
	constructor: {
		value: Bird,
		enumerable: false,
		writable: false,
		configurable: true
	}
});
console.log('is Bird3 instance of Animal? ', new Bird3() instanceof Animal);
//
