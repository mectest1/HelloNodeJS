'use strict';

const {express, PORT
	, publicPath, bowerPath
	} = require('../config/express-app-config');
const compression = require('compression');
const path = require('path');
//const PUBLIC_DIR = 'client';
//const publicPath = path.resolve(__dirname, '../', PUBLIC_DIR);
//const bowerPath = path.resolve(__dirname, '../../', 'bower_components');


let app = express()
		.use(compression())
		.use('/bower_components', express.static(bowerPath))
		.use(express.static(publicPath))
		.listen(PORT);

console.log('Server running on PORT', PORT);

