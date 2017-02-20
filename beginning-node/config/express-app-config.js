'use strict';

const express = require('express');
const serveStatic = require('serve-static');	//alias to serve-static
const serveIndex = require('serve-index');
const path = require('path');
const PORT = 3000;
const PUBLIC_DIR = 'client';
const publicPath = path.resolve(__dirname, '../', PUBLIC_DIR);
const bowerPath = path.resolve(__dirname, '../../', 'bower_components');

module.exports = {
	express: express,
	serveStatic: serveStatic,
	serveIndex: serveIndex,
	path: path,
	PORT: PORT,
	publicPath: publicPath,
	bowerPath: bowerPath
};