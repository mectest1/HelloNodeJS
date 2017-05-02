//#!node

process.on('message', m => {
	console.log('CHILD got message', m);
});
process.on('close', (code, signal) => {
	console.log('child process closed with code: ', code, 'and signal: ', signal);
});
process.on('exist', (code, signal) => {
	console.log('child process exist with code: ', code, 'and signal: ', signal);
});
process.on('exit', err => {
	console.log('child process comes into error', err);
});
process.send({
	foo: 'bar'
});