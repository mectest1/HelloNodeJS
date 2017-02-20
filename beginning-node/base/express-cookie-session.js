'use strict';

const {express, PORT} = require('../config/express-app-config');
const cookieSession = require('cookie-session');

let pap = express()
		.use(cookieSession({
			keys: ['my super secret sign key']
})).use('/home', (req, res) => {
	if(req.session.views){
		req.session.views++;
	}else{
		req.session.views = 1;
	}
	res.end('Total views for your: ' + req.session.views);
}).use('/reset', (req, res) => {
	delete req.session.views;
	res.end('Cleared all your views');
}).listen(PORT);
console.log('Server running on port', PORT);