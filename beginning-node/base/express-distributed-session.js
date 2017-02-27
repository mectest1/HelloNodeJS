'use strict';

const express = require('express');
const expressSession = require('express-session');

const MongoStore = require('connect-mongo')(expressSession);
const sessionStore = new MongoStore({	//throw: Connection strategy not found
	host: 'localhost',
	port: '27017',
	db: 'session'
});
const PORT = 3000;

let app = express()
		.use(expressSession({
			secret: 'my super secret sign key',
			store: sessionStore
		})).use('/home', (req, res) => {
			if(req.session.views){
				++req.session.views;
			}else{
				req.session.views = 1;
			}
			res.end('Total views for you: ' + req.session.views);
		}).use('/reset', (req, res) => {
			delete req.session.views;
			res.end('Cleared all your views');
		}).listen(PORT);
console.log('Server running on port', PORT);