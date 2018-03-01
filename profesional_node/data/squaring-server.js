/**
 * A simple http server that returns squaring of a number
 */

const PORT = process.argv[2] && parseInt(process.argv[2], 10) || 8080;

require('http').createServer((req, res) => {
	let body = '';
	req.setEncoding('utf8');
	req.on('data', data => {
		body += data;
	});
	//
	req.once('end', () => {
		if(!body){
			res.end('Request body empty');
			return;
		}
		try{
			let number = JSON.parse(body);
			let squared = Math.pow(number, 2);
			res.end(JSON.stringify(squared));
		}catch(e){
			//ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
			res.end(`Error occurred while processing the number: ${e.message}`);
		}
		
	});
}).listen(PORT, () => {
	console.log('Squaring Server listening');
});