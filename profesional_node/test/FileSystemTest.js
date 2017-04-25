
//#!jasmine
describe('Suite for the FileSystems library', function(){
	const fs = require('fs');
	//const {constants} = fs;
	const path = require('path');
	const {posix, win32} = path;
	const util = require('util');
	const q = require('q');
	const data_dir = path.resolve(__dirname, '../data');
	
	it('shows how to use .existsSync() to check the existence of a file', done => {
		
	});
	
	
	xit('shows how to use .access() to check if a file exists', (done) => {
		fs.access('/some/file/that/does not/exist', (err) => {
			console.log('access check result: ', err);
			expect(err).toBeTruthy();
			done();
		})
	});
	
	xit('shows how to create a write stream', done => {
		const msgFile = path.join(data_dir, 'message.txt');
		const ws = fs.createWriteStream(msgFile, {
			autoClose: true,
			flags: 'a'
		});
		ws.end('\ndata written with WriteStream at ' + new Date().toLocaleString());
		ws.on('finish', () => {
			console.log('all data has been written into file', ws.path);
			
			const rs = fs.createReadStream(msgFile, {
			autoClose: true
			});
			rs.on('data', chunk => {
				console.log('data read from file ', rs.path);
				console.log(chunk.toString());
				done();
			});
		});
		
		
	});
	
	xit('shows how to create a read stream', done => {
		const msgFile = path.join(data_dir, 'message.txt');
		const rs = fs.createReadStream(msgFile, {
			autoClose: true
		});
		rs.on('open', ()=>{
			console.log('opened file ', rs.path);
		});
		rs.on('data', chunk => {
			console.log('read data:\n');
			console.log(chunk.toString());
		});
		rs.on('end', () => {
			console.log('read steam ended: ', rs.path);
			console.log('bytes read: ', rs.bytesRead);
			done();
		});
	});
	
	xit('shows the process to append file and access it', (done) => {
		const msgFile = path.join(data_dir, 'message.txt');
		q.bind(fs.open)(msgFile).then(fileDescriptor => {
			//console.log('fileDescriptor: ', fileDescriptor);
			return q.nbind(fs.appendFile)(msgFile, 'data to appended at ' + Date.now() + '\n')
			.then(() => console.log('data appended successfully'))
			.then(() => q.resolve(fileDescriptor));
			
		}).then(fd => {
			//console.log('fd ', fd);
			//return q.nbind(fs.close)(fd);
			return q.resolve();
		}).then(() => {
			//console.log('File closed successfully');
			const {F_OK, R_OK, W_OK} = fs.constants;
			return q.nbind(fs.access)(msgFile, F_OK | R_OK | W_OK);
		}).then(() => {
			console.log('can access file: ', msgFile);
		}).catch(err => {
			console.log('error occurred ', err);
		}).finally(() => {
			done();
		});
		
	});
	
	xit('checks the fs library', () => {
		console.log(data_dir);
		console.log(path.join(data_dir, 'message.txt'));
	});
	
});