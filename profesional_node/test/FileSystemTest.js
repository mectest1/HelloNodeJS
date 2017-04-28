
//#!jasmine
describe('Suite for the FileSystems library', function(){
	const fs = require('fs');
	//const {constants} = fs;
	const path = require('path');
	const {posix, win32} = path;
	const util = require('util');
	const q = require('q');
	const data_dir = path.resolve(__dirname, '../data');
	
	it('shows how to extract information from the fs.Stats object', done => {
		Promise.all([	//This all work
		//q.all([		//This will also work
			q().then(() => {
				//const f = path.join(data_dir, 'message.txt');
				const f = __dirname;
				
				return q.nbind(fs.stat)(f);
			}).then(stats => {
				console.log('stats.isFile', stats.isFile());
				console.log('stats.isDirectory', stats.isDirectory());
				console.log('stats.isBlockDevice', stats.isBlockDevice());
				console.log('stats.isCharacterDevice', stats.isCharacterDevice());
				console.log('stats.isSymbolicLink', stats.isSymbolicLink());
				console.log('stats.isFIFO', stats.isFIFO());
				console.log('stats.isSocket', stats.isSocket());
			})
			
		]).then(() => done());
	});
	
	xit('shows content of fs.constants', () => {
		console.log('contents of fs.constants', util.inspect(fs.constants));
	});
	
	xit('shows how to use .write() to write content into a file', done => {
		const msgFile = path.join(data_dir, 'message.txt');
		
		//Even this can work
//		q().then(() => {
//			console.log('derp');
//		}).then(() => {
//			console.log('derp2');
//		}).finally(() => {
//			done();
//		});
		
		q.nbind(fs.open)(msgFile, 'a').then(fd => {
			console.log('file descriptor:', fd);
			//return q.nbind(fs.write)(fd, 
			//	Buffer.from('\nhello from .write() at' + new Date().toLocaleString()));
			return q.nbind(fs.write)(fd, '\nhello from .write() at ' + new Date().toLocaleString());
		}).then(([written, buffer]) => {
			console.log('written length: ', written);
			console.log('written data: ', buffer.toString());
			return q.nbind(fs.readFile)(msgFile);
		}).then(data => {
			console.log('current content of file', data.toString());
			done();
		}).catch(e => {
			console.log('error occurred', e);
			done();
		})
		
		;
		
	});
	
	
	xit('shows how to use .watchFile() to poll file chnages', done => {
		const msgFile = path.join(data_dir, 'message.txt');
		
		
		fs.watchFile(msgFile, {
			interval: 1000
		}, (cur, prev) => {
			console.log('current stat of file: ', cur);
			console.log('previous stat of file: ', prev);
			fs.unwatchFile(msgFile);
			done();
		});
		
		q.nbind(fs.appendFile)(msgFile, '\nhello from .watchFile() at' + new Date().toLocaleString()).then(e => {
			if(e){
				console.log('error occurred while writing file:', e);
				done();
			}
		});
	});
	
	xit('shows how to use .watch() to watch file status', done => {
		const msgFile = path.join(data_dir, 'message.txt');
		
		fs.watch(msgFile, (eventType, fileName) => {
			console.log('event occured:  type:', eventType, ', file: ', fileName);
			done();
		});
		q.nbind(fs.appendFile)(msgFile, '\nhello from .watch() at ' + new Date().toLocaleDateString()).then(e => {
			if(e){
				console.log('write file error', e);
				done();
			}
		});
	});
	
	xit('shows how to use .stat() to get file info', done => {
		const currentFile = path.join(__filename);
		
		let statP = q.nbind(fs.stat)(currentFile).then(stat => {
			console.log('stat info of file ', currentFile);
			console.log(util.inspect(stat));
		});
		let lstatP = q.nbind(fs.lstat)(currentFile).then(stat => {
			console.log('lstat info of file ', currentFile);
			console.log(stat);
		});
		//q.all(statP, lstatP)	//NO, this will not work
		q.all([statP, lstatP])
		//Promise.all(statP, lstatP)
		.then((derpValue) => {
			done();
		})
		.catch(er => {
			console.error(er);
		})
//		.finally(() => {
//			done();
//		})
		;
	});
	
	xit('shows how to use .realPath() to retrieve real path', done => {
		q.nbind(fs.realpath)(process.cwd()).then(resolvedPath => {
			console.log('real path of process.cwd() is', resolvedPath);
		}).catch(er => {
			console.error(er);
		}).finally(() => {
			done();
		});
	});
	
	xit('shows how to use .readFile() to read content of a file', done => {
		const msgFile = path.join(data_dir, 'message.txt');
		
		q.nbind(fs.readFile)(msgFile).then(data => {
			console.log('read file content:', data.toString());
		}).catch(err => {
			console.log('read file failed', err);
		}).finally(() => {
			done();
		});
	});
	
	xit('shows how to use .readdir() to read content of a directory', done => {
		const dirname = __dirname;
		q.nbind(fs.readdir)(dirname).then(files => {
			console.log('files in directory ', dirname);
			files.forEach(file => console.log('\t--', file));
			done();
		}).catch(err => {
			console.error(err);
			done();
		});
	});
	
	xit('shows how to use .read() to read content from a file', done => {
		const msgFile = path.join(data_dir, 'message.txt');
		let openedFile = null;
		
		q.nbind(fs.open)(msgFile, 'r+').then(fd => {
			console.log('open file descriptor', fd);
			openedFile = fd;
			const BUF_SIZE = 1024;
			
			const readBuffer = Buffer.alloc(BUF_SIZE);
	
			//return q.bind(fs.read)(fd, readBuffer, 0, 1024, 0);	//-> WRONG: it will simply return Q(fd);
			return q.nbind(fs.read)(fd, readBuffer, 0, 1024, 0);	//OK
//			return q.nfcall(fs.read, fd, readBuffer, 0, BUF_SIZE, 0);	//OK
//			return q.nfapply(fs.read, [fd, readBuffer, 0, BUF_SIZE, 0]);	//OK
	

			//version 2
//			const deferred = q.defer();
//			fs.read(fd, readBuffer, 0, 1024, 0, (err, bytesRead, buffer) => {
//				if(err){
//					deferred.reject(err);
//					return;
//				}
//				deferred.resolve([bytesRead, buffer]);
//			});
//			
//			return deferred.promise;
			
		})
		.then(([bytesRead, buffer]) => {
			console.log('bytes read: ', bytesRead);
			console.log('read content: ', buffer.toString());
			done();
		})
		.catch(e => {
			console.log('error occurred', e);
			done();
		}).finally(() => {
			fs.close(openedFile);
		});
		
	});
	
	xit('shows how to use .open() to open directory/file', done => {
		const msgFile = path.join(data_dir, 'message.txt');
		
		q.nbind(fs.open)(data_dir, 'r').then(fd => {
			console.log('data_dir opened successfully with file descriptor', fd);
			return q(fd);
		}).then(dd => {
			console.log('received file descriptor ', dd);
			return q.nbind(fs.open)(msgFile, 'a+');
		}).then(fd => {
			console.log('msgFile opened successfully with file descriptor', fd);
			done();
		}).catch(e => {
			console.log('open file/directory failed with error', e);
			done();
		});
	});
	
	xit('shows how to use .mktemp() to make temporary directory', done => {
		const tmpDirPrefix = '/tmp/dir/name/';
		
		q.nbind(fs.mkdtemp)(tmpDirPrefix).then(p => {
			console.log('Tmp dir created successfully ', p);
			done();
		}).catch(e => {
			console.log('create tmp dir failed', e);
			done();
		});
	});
	
	xit('shows how to use .lstat() to get statistic info of a file', (done) => {
		const msgFile = path.join(data_dir, 'message.txt');
		//const msgFile = '/derp/file/that/does/not/exist';
		q.nbind(fs.lstat)(msgFile).then(stat => {
			console.log('stat info for file', msgFile);
			console.log(util.inspect(stat));
		}).catch(e => {
			console.log('get stat info for file ', msgFile, 'failed, error: ');
			console.log(e);
			
		}).finally(() => {
			done();
		});
	});
	
	xit('shows how to use .existsSync() to check the existence of a file', () => {
		const derpFile = '/file/that/does/not/exist';
		expect(fs.existsSync(derpFile)).toBeFalsy();
		
		const msgFile = path.join(data_dir, 'message.txt');
		expect(fs.existsSync(msgFile)).toBeTruthy();
	});
	
	
	xit('shows how to use .access() to check if a file exists', (done) => {
		q.all(
			[q().then(() => {
				fs.access('/some/file/that/does not/exist', (err) => {
					console.log('access check result: ', err);
					expect(err).toBeTruthy();
					//done();
				});

			}), q().then(() => {
				const msgFile = path.join(data_dir, 'message.txt');
				return q.nbind(fs.access)(msgFile);

			}).then(e => {
				console.log('check result for msgFile (undefined means it exists): ', e);
			})]
		).then(() => {
			done();
		});
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