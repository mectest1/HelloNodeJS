'use strict';

const cluster = require('cluster');
const http = require('http');
const numCpus = require('os').cpus().length;
const log = console.log;
const PORT = 3000;

if(cluster.isMaster){
	//Fork workers;
	for(let i = 0; i < numCpus; ++i){
		let worker = cluster.fork();
		log('Started a worker with pid:', worker.process.pid);
	}
	//Listen to worker exiting
	cluster.on('exit', (worker, code, signal) => {
		log('worker', worker.process.pid, 'exited');
	});
}else{
	//Workers can share any TCP connection
	http.createServer((req, res) => {
		res.writeHead(200);
		res.end('Hello world from worker: ' + cluster.worker.process.pid);
	}).listen(PORT);;
	log('server running on port: ', PORT);
}