
//unpause the stdin stream
//process.stdin.resume();
//console.log('input a number to get the plus 1 response');
process.stdin.on('data', data => {
	let number;
	try{
		number = parseInt(data.toString(), 10);
		++number;
		
		process.stdout.write(number + '\n');
		
	}catch(err){
		process.stderr.write(err.message + '\n');
	}finally{
		//process.exit();
	}
});

//This process will exit after 3 seconds;
setTimeout(process.exit, 3000);