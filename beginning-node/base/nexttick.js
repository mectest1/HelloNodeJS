//
process.nextTick(()=> {
	console.log('next tick');
});
console.log('immediate');