
class Circle{
	
	constructor(x, y, r){
		this.x = x;
		this.y = y;
		this.r = r;
		
		this.r_squared = () => {
			return Math.pow(this.r, 2);
		};
	}
	
	
	
	get area(){
		return Math.PI * this.r_squared();
	}
}

//module.exports = {Circle};
module.exports.Circle = Circle;