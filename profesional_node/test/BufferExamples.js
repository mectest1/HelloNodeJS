

//jasmine BufferExample.js
describe('Buffer in Node', function(){
	it('decoding a buffer', () => {
		let utf8String = 'my string';
		let buf = Buffer.from(utf8String);
		let base64String = buf.toString('base64');	//the same as btoa();
		console.log(base64String);
		
		
		//expect(base64String).toEqual(btoa(utf8String));
	});
	it('copying a buffer', () => {
//		let buffer1 = new Buffer('this is the content of the my buffer');
//		let buffer2 = new Buffer(11);
		let buffer1 = Buffer.from('this is the content of the my buffer');
		let buffer2 = Buffer.alloc(11);
		
		let targetStart = 0;
		let sourceStart = 8;
		let sourceEnd = 19;
		
		buffer1.copy(buffer2, targetStart, sourceStart, sourceEnd);
		console.log(buffer2.toString());
		expect(buffer2.toString()).toEqual('the content');
	});
	
	xit('says hello, buffer', function(){
		let buf = Buffer.from('hello, buffer');
		//console.log(buf.toString());
		expect(buf.toString()).toBe('hello, buffer');
	});
	
	xit('test the buffer.copy', () => {
		const buf1 = Buffer.allocUnsafe(26);
		const buf2 = Buffer.allocUnsafe(26).fill('!');

		for (let i = 0; i < 26; ++i){
			buf1[i] = i + 97;	//97 is the decimal ASCII value for 'a'
		}

		buf1.copy(buf2, 8, 16, 20);

		console.log(buf2.toString('ascii', 0, 25));
		expect(buf2.toString('ascii', 0, 25)).toEqual('!!!!!!!!qrst!!!!!!!!!!!!!');
	});
});

//let buffer = Buffer.from('this is the content of the buffer');
//let smallerBuffer = buffer.slice(8, 19);
//console.log(smallerBuffer.toString());	//-> the content


//let buf = Buffer.from('my buffer content');
//console.log(buf[10]);


//let buf = new Buffer('Hello, World!');
//let buf2 = new Buffer('8b76fde713ce', 'base64');
//
//console.log(buf);
//console.log(buf.toString());
//console.log(buf2);
//console.log(atob(buf2.toString()));



//const buf1 = Buffer.allocUnsafe(26);
//const buf2 = Buffer.allocUnsafe(26).fill('!');
//
//for (let i = 0; i < 26; ++i){
//	buf1[i] = i + 97;	//97 is the decimal ASCII value for 'a'
//}
//
//buf1.copy(buf2, 8, 16, 20);
//
//console.log(buf2.toString('ascii', 0, 25));
//
