'use strict';

const {MongoClient} = require('mongodb');

const website = {
	url: 'http://www.google.com/ncr',
	visits: 0
};
const findKey = {
	url: 'http://www.google.com/ncr'
};



MongoClient.connect('mongodb://localhost:27017/demo', (err, db) => {
	if(err){
		throw err;
	}
	//
	const collection = db.collection('websites');
	collection.insert(website, (err, docs) => {
		let done = 0;
		
		//
		function onDone(err){
			++done;
			
			//
			if(done < 4 ){
				return;
			}
			collection.find(findKey).toArray((err, results) => {
				console.log('Visits: ', results[0].visits);
				//cleanup
				collection.drop(() => {
					db.close();
				});
			});
			
		};
		
		//
		const incrementVisits = {
			'$inc': {
				visits: 1
			}
		};
		
		collection.update(findKey, incrementVisits, onDone);
		collection.update(findKey, incrementVisits, onDone);
		collection.update(findKey, incrementVisits, onDone);
		collection.update(findKey, incrementVisits, onDone);
	});
});