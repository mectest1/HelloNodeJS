'use strict';

const cluster = require('cluster');
const log = console.log;

if(cluster.isMaster){
	let worker = cluster.fork();
	worker.on('message', msg => {
		log('Message received from worker: ', msg);
	})
}else{
	log('Worker started');
	process.send('Hello World! from ' + cluster.worker.process.pid);
	process.exit();
}
