/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const dgram = require('dgram');
const PORT = 4000;

describe('This suite tests the DUP package in Node', () => {
	'use strict';
	
	xit('builds a datagram server', done => {
		var server = dgram.createSocket('udp4');
		
		server.on('error', err => {
			console.log('server error: \n' + err.stack);
			console.log('Time to close the server');
			server.close(() => {
				done();
			});
		}).on('message', (message, rinfo) => {
			console.log(`server got: ${message} from ${rinfo.address}:${rinfo.port}`);
			console.log('now might be a good time to terminate the UDP server');
			server.close(() => {
				done();
			});
		}).on('listening', () => {
			let address= server.address();
			console.log('server listening on ' + address.address + ':' + address.port);
			
		}).bind(PORT);
		
		
		var client = dgram.createSocket('udp4');
		client.send(Buffer.from('Hello, World'), PORT, 'localhost', err => {
			if(err){
				console.log(`send message failed: ${err}`);
			}else{
				console.log('message sent successfully');
			}
			client.close();
		});
	});
	
	it('builds a simple echo server with datagram', done => {
		const server = dgram.createSocket('udp4');
		server.on('error', err => {
			console.log(`server error: \n ${err.stack}. Time to close the server`);
			server.close(() => {
				done();
			});
		}).on('message', (message, rinfo) => {
			console.log(`server got: ${message} from ${rinfo.address}:${rinfo.port}. Now send it back`);
			server.send(message, rinfo.port, rinfo.address, err => {
				if(err){
					console.log(`send message failed; ${err}`);
				}else{
					console.log('message sent successfully');
				}
				server.close();
			});
		}).bind(PORT);
		const client = dgram.createSocket('udp4');
		client.send(Buffer.from('Hello, World!'), PORT, 'localhost', err => {
			if(err){
				console.log(`send message failed; ${err}`);
			}else{
				console.log('message sent successfully');
			}
		});
		client.on('message', (msg, rinfo) => {
			console.log(`client message got back from server: ${msg} from ${rinfo.address}:${rinfo.port}`);
			client.close(err => {
				done();
			});
		}).on('error', err => {
			console.log(`client error: \n ${err.stack}. Time to close the server`);
			server.close(() => {
				done();
			});
		});
	});
});