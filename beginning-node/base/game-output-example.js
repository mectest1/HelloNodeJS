'use strict';

(function(){
	const log = console.log;
	const UA_BASE = 'A'.charCodeAt(0);
	//const LA_BASE = 'a'.charCodeAt(0);
	var encrypted;
	
	
	//encrypt
//	const outString = '52FengYanJing';
//	encrypted = [];
//	[].forEach.call(outString, (ch, idx) => {
//		encrypted.push(ch.charCodeAt(0) - UA_BASE);
//	});
//	log(encrypted);	//[ -12, -15, 5, 36, 45, 38, 24, 32, 45, 9, 40, 45, 38 ]
	
	//decrypt
	encrypted = [ -12, -15, 5, 36, 45, 38, 24, 32, 45, 9, 40, 45, 38 ];
	let decrypted = '';
	[].forEach.call(encrypted, (code) => {
		decrypted += String.fromCharCode(UA_BASE + code);
	});
	log(decrypted);
})();