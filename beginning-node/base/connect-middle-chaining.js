'use strict';

function parseJson(req, res, next){
//	req.headers.forEach(item => console.log(item, ' -> ', req.headers[item]));
//	Object.entries(req.headers).forEach(([key, value]) => console.log(key, ' -> ', value));
	console.log('Request headers: ');
	for(var key in req.headers){
		console.log(key, ' -> ', req.headers[key]);
	}
	if(req.headers['content-type'] === 'application/json'){
		//Load all the data
		let readData = '';
		req.on('readable', () => {
			readData += req.read();
		});
		
		//try to parse
		req.on('end', () => {
			try{
				req.body = JSON.parse(readData);
			}catch(e){
				
			}
			next();
		});
	}
	next();
}

const connect = require('connect');
const PORT = 3000;

connect()
		.use(parseJson)
		.use((req, res) => {
			if(req.body){	//not working: the req.body is laways null or undefined;
				res.end('Json parsed!, value of foo: ', req.body.foo);
			}else{
				res.end('no Json detected!');
			}
		}).listen(PORT);
console.log('server running on port ', PORT);