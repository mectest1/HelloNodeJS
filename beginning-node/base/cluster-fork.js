'use strict';

const cluster = require('cluster');
if(cluster.isMaster){
	console.log('Starting a worker');
	cluster.fork();
}else{
	console.log('Worker started');
	process.exit();
}