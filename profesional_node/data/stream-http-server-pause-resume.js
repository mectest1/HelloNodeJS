//#!node
require('http').createServer((req, res) => {
	//res.setDefaultEncoding('utf8');
	
	
	const rs = require('fs').createReadStream(__filename);
	rs.on('data', chunk => {
		if(!res.write(chunk)){
			rs.pause();
		}
	});
	
//	res.on('drain', rs.resume);
//	rs.on('end', res.end);
	res.on('drain', () => {
		rs.resume();
	});
	rs.on('end', () => {
		res.end();
	});
	
}).listen(1337);