'use strict';

class List{
	constructor(){
		this.items = [];
	}
	
	get count(){
		return this.items.length;
	}
	
	add(item){
		if(!(item && item.id)){
			throw new Error('item must have id');
		}
		this.items.push(item);
	}
	
	remove(id){
		this.items = this.items.filter(item => {
			item.id !== id;
		});
	}
	
	clear(){
		this.items = [];
	}
	
	getIds(){
		return this.items.map(item => item.id);
	}
	
	get(id){
		return this.items.filter(item => id === item.id)[0];
	}
}

module.exports = List;