//#!node
require('http').createServer((req, res) => {
	require('fs').createReadStream(__filename).pipe(res);
}).listen(1337);