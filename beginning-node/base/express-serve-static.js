'use strict';

const express = require('express');
const serveStatic = require('serve-static');	//alias to serve-static
const serveIndex = require('serve-index');
const path = require('path');
const PORT = 3000;
const PUBLIC_DIR = 'client';
const publicPath = path.resolve(__dirname, '../', PUBLIC_DIR);
const bowerPath = path.resolve(__dirname, '../../', 'bower_components');
let app = express()
		.use(serveStatic(publicPath, {
			index: ['index.html', 'index.htm', 'default.html', 'default.htm']
		}))
		.use('/bower_components', express.static(bowerPath))
		.use(serveIndex(publicPath))
		.listen(PORT);
console.log('serving files from', publicPath, 'on port', PORT);