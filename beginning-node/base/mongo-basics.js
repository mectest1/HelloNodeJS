'use strict';

const {MongoClient} = require('mongodb');

let demoPerson = {name: 'John', lastName: 'Smith'};
let findKey = {name: 'John'};

MongoClient.connect('mongodb://localhost:27017/demo', function(err, db){
	if(err) throw err;
	
	console.log('Successfully connected');
	
	let collection = db.collection('people');
	collection.insert(demoPerson, function(err, docs){
		console.log('Inserted', docs[0]);
		console.log('ID:', demoPerson._id);
		
		collection.find(findKey).toArray(function(err, results) {
			console.log('Found results: ', results);
			
			//
			collection.remove(findKey, function(err, results){
				console.log('Deleted person');
				
				db.close();
			});
		});
	});
});