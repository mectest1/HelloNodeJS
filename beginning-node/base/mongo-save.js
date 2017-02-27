'use strict';

const {MongoClient} = require('mongodb');

let demoPerson = {name: 'John', lastName: 'Smith'};
let findKey = {name: 'John'};

MongoClient.connect('mongodb://localhost:27017/demo', (err, db) => {
	if(err){
		throw err;
	}
	
	//
	let collection = db.collection('people');
	
	collection.insert(demoPerson, (err, docs) => {
		demoPerson.lastName = 'Martin';
		collection.save(demoPerson, (err) => {
			console.log('Updated');
			
			//
			collection.find(findKey).toArray((err, results) => {
				console.log(results);
				//clearnup
				collection.drop(() => {
					db.close();
				});
			});
		});
	});
});