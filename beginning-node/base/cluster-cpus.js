'use strict';

const cluster = require('cluster');
const numCpus = require('os').cpus().length;
const log = console.log;
//
if(cluster.isMaster){
	//fork workers;
	for(let i = 0; i < numCpus; ++i){
		log('Starting a worker');
		cluster.fork();
	}
	//Listen to any worker exiting
	cluster.on('exit', (worker, code, signal) => {
		log('worker', worker.process.pid, 'exited');
	});
}else{
	log('Worker started');
	process.exit();
}