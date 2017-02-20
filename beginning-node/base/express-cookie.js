'use static';

const {express, PORT}
	= require('../config/express-app-config');
	
let app = express()
		.use((req, res) => {
			console.log('--client request cookies header:\n', req.headers['cookie']);
			res.cookie('name', 'foo');
			res.end('Hello');
		}).listen(PORT);
console.log('server running on port', PORT);
