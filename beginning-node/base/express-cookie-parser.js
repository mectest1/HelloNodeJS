'use strict';

const {express, PORT} = require('../config/express-app-config');
const cookieParser = require('cookie-parser');

let app = express()
		.use(cookieParser('my super secret sign key'))
		.use('/toggle', (req, res) => {
			if(req.cookies.name){
				res.clearCookie('name');
				res.end('name cookie cleared! Was: ' + req.cookies.name);
			}else{
				res.cookie('name', 'foo');
				res.end('name cookie set!');
			}
		})
		.use('/signed-toggle', (req, res) => {
			if(req.signedCookies.name){
				res.clearCookie('name');
				res.end('name cookie cleared! Wss: ' + req.signedCookies.name);
			}else{
				res.cookie('name', 'foo', {
					signed: true
				});
				res.end('name cookie set');
			}
		})
		.use((req, res) => {
			if(req.cookies.name){
				console.log('User name: ', req.cookies.name);
			}else{
				res.cookie('name', 'foo');
			}
			res.end('hello');
}).listen(PORT);
console.log('server running on port', PORT);