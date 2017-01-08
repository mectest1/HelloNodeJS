
var log5times = exports.log5Times = function(){
	console.log('current directory ' + __dirname + ', current file name: ' + __filename);
	var count = 0;
	var intervalObject = setInterval(function(){
		++count;
		console.log(count, 'seconds passed');
		if(5 == count){
			console.log('exiting');
			clearInterval(intervalObject);
		}
	}, 1000);
};