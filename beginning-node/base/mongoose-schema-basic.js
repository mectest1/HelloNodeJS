'use strict';

const mongoose = require('mongoose');

//Define a schema
let tankSchema = new mongoose.Schema({
	name: 'string',
	size: 'string'
});
tankSchema.methods.print = () => {
	console.log('I am', this.name, 'the', this.size);
};

//Compile it into a model
const Tank = mongoose.model('Tank', tankSchema);
mongoose.connect('mongodb://localhost:27017/demo');

const db = mongoose.connection;
db.once('open', () => {
	console.log('connected');
	
	//Use the model
	let tony = new Tank({
		name: 'tony',
		size: 'small'
	});
	tony.save((err) => {
		if(err){
			throw err;
		}
		Tank.findOne({
			name: 'tony'
		}).exec((err, tank) => {
			//You get a model instance all setup and ready
			tank.print();
			
			db.collection('tanks').drop(() => {
				db.close();
			});
		});
	});
});

