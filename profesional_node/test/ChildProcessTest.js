
//#! jasmine

describe('Suite to test the Child Processes library', () => {
	const q = require('q');
	const child_process = require('child_process');
	const path = require('path');
	const fs = require('fs');
	const {spawn} = child_process;
	
	
	it('shows how to use .kill() to send signals to child process', done => {
		const childScript = path.join(__dirname, '../data/sub-signal.js');
		
		const child = child_process.spawn('node', [childScript]);
		
		//child.kill('SIGNDERP');	//unknown signal
//		child.kill('SIGINT');
//		child.kill('SIGCONT');
//		child.kill('SIGUSR1');	//Unknown signal on Windows 
		
		setTimeout(done, 3000);
	});
	
	xit('shows how to use .spawn() to communicate with the child process', done => {
		const childScript = path.join(__dirname, '../data/sub-plus1.js').normalize();
		
		//Spawn the child with a node process executing the plug_one app
		const child = child_process.spawn('node', [childScript]);
		let number = Math.floor(Math.random() * 10000);
		
		child.stdin.write(number + '\n');
		
		child.stdout.on('data', data => {	//data is Buffer
			console.log('with number', number, 'the child response is', data && data.toString());	
			//child.kill();	//turn on&off manually termination of child process
		});
		child.stderr.on('data', data => {
			console.log('with number', number, 'the child responds with an error', err);
			done();
		});
		child.on('exit', (code, signal) =>{
			
			//if child.kill() is invoked, then (code, signal) would be (null, 'SIGTERM'), 
			//else the child process will terminate by itself, and (code, signal) will be (0, null);
			console.log('child process exit with code', code, ', signal', signal);
			done();
		});
		
	});
	
	xit('shows to how use .exe() to pass environment variables to child process', done => {
		const childScript = path.join(__dirname, '../data/sub-env.js').normalize();
		console.log(childScript);
		child_process.exec(`node ${childScript}`, {
			env: {
				number: 123
			}
		}, (err, stdout, stderr) => {
			if(err){
				throw err;
			}
			console.log('stdout:', stdout);
			console.log('stderr:', stderr);
			done();
		});
	});
	
	
	xit('shows how to use .stdio to access standard pipes of the child process', () => {
		const msgFile = path.join(__dirname, '../data/message.txt');
		
		const child = spawn('C:/cygwin64/bin/ps.exe', {
			stdio: [
				0,	//use parent's stdin for child
				'pipe',		//pipe child's stdout to parent
				fs.openSync(msgFile, 'a')	//direct child's stderr to a file
			]
		});
		
		expect(child.stdio[0]).toBeNull();
		expect(child.stdio[0]).toBe(child.stdin);
		
		expect(child.stdout).toBeTruthy();
		expect(child.stdio[1]).toBe(child.stdout);
		
		expect(child.stdio[2]).toBeNull();
		expect(child.stdio[2]).toBe(child.stderr);
		
	});
	
	xit('shows how to ue .send() to send message between parent/child process', done => {
		const sub_script = path.join(__dirname, '../data/sub-process.js');
		
		const sub = child_process.fork(sub_script);
		sub.on('message', m => {
			console.log('PARENT got message', m);
//			process.nextTick(() => {
//				done();
//			});
			setTimeout(done, 1000);	//Give the child process sometime to response;
		});
		
		sub.send({
			hello: 'world'
		}, e => {
			if(e){
				console.log('message send failed', e);
			}
		});
		//sub.kill();
		sub.on('error', e => {
			console.log('error occurred on sub process', e);
			done();
		});
	});
	
	
	xit('shows how to use .kill() to send signal to the child process', done => {
		const grep = spawn('C:/cygwin64/bin/ps.exe');;
		
		grep.on('close', (code, signal) => {
			console.log('child process terminated due to receipt of signal ', signal);
			done();
		});
		
		//Send SIGHUP to process
		console.log('send SIGHUP to child process');
		//grep.kill('SIGTERM');
		grep.kill();
//		setTimeout(() => {
//		}, 1000);	//not the best way to terminate a child process
		
	});
	
	xit('shows advanced technique to use .spawn()', done => {
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