
'use strict';

process.stdin.on('readable', function(){
	let buf = null;
	//
	while(null != (buf = process.stdin.read())){
		console.log('Got: ');
		process.stdout.write(buf.toString());
	}
});
console.log('Press Ctrl + C to exit.');