
process.on('SIGDERP', () => {
	console.log('SIGDERP received');
});
process.on('SIGPIPE', () => {
	console.log('SIGPIPE received');
});
process.on('SIGINT', () => {
	console.log('SIGINT received');
});
process.on('SIGCONT', () => {
	console.log('SIGCONT received');
});
process.on('SIGUSR1', () => {
	console.log('SIGUSR1 received');
});

//Terminate current process after 3 seconds;
setTimeout(process.exit, 3000);