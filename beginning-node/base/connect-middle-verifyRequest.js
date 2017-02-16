'use strict';


function auth(req, res, next){
	function send401(){
		res.writeHead(401, {
			'WWW-Authenticate': 'Basic'
		});
	}
	
	
	let authHeader = req.headers.authorization;
	if(!authHeader){
		send401();
		return;
	}
	
	let auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
	let user = auth[0];
	let pass = auth[1];
	if('foo' === user && 'bar' === pass){
		next();	//all good
	}else{
		send401();
	}
}

//
const connect = require('connect');
const PORT = 3000;

connect()
		.use('/admin', auth)
		.use('/admin', (req, res) => {
			res.end('Authorized!');
		})
		.use((req, res) => {
			res.end('Public');
		})
		.listen(PORT);
console.log('server running on port ', PORT);