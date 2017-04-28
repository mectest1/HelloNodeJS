
//#! jasmine

describe('Suite to test the Child Processes library', () => {
	const q = require('q');
	const child_process = require('child_process');
	const {spawn} = child_process;
	
	it('shows advanced technique to use .spanw()', done => {
		const ps = spawn('C:/cygwin64/bin/ps.exe');
		const grep = spawn('C:/cygwin64/bin/grep.exe', ['bash']);
		//const grep = spawn('C:/cygwin64/bin/less.exe');
		
		ps.stdout.on('data', data => {
			grep.stdin.write(data);
		});
		ps.stderr.on('data', data => {
			console.log('ps stderr:', data);
		});
		ps.on('close', code => {
			if(code){
				console.log('ps process exited with code', code);
			}
			grep.stdin.end();
		});
		
		//
		grep.stdout.on('data', data => {
			console.log(data.toString());
		});
		grep.stderr.on('data', data => {
			console.log('grep stderr:', data.toString());
		});
		grep.on('close', code => {
			if(code){
				console.log('grep process exited with code', code);
			}
			done();
		});
	});
	
	
	xit('shows how to use .execFile() to execute command without spawning a new shell',
		done => {
		q.nbind(child_process.execFile)('node', ['--version'])
		//q.nbind(child_process.execFile)('jasmine', ['version'])
		.then(([out, err]) => {
			out && console.log(out);
			err && console.log(err);
		}).catch(err => {
			console.error(err);
		}).finally(() => {
			done();
		});
		
	});
	
	xit('shows how to use .exec() to execute command', done => {
		q.nbind(child_process.exec)('dir', {
			encoding: 'utf8',	//default value
			cwd: 'c:\\'
		}).then(([out, err]) => {
			out && console.log(out);
			err && console.log(err);
		}).catch(err => {
			console.error(err);
		}).finally(() => {
			done();
		});
	});
	
	xit('shows how to spawn child process', done => {
		const ls = spawn('dir');
		
		ls.stdout.on('data', data => {
			console.log('stadout:', data.toString());
		});
		
		ls.stderr.on('data', data => {
			console.error(`stderr: ${data}`);
		});
		
		ls.on('close', code => {
			console.log('child process existed with code', code);
			done();
		});
	});
});