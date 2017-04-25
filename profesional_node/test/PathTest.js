
//#!jasmine
describe('Suite to test the Path library', function(){
	const path = require('path');
	const {posix, win32} = path;
	
	it('shows that .sep returns the path segment separator', () => {
		expect(posix.sep).toEqual('/');
		expect(win32.sep).toEqual('\\');
	});
	
	xit('shows that .resolve() will return the absolute path', () => {
		console.log('The given sequence of paths is processed from right to left',
			'with each subsequent path prepend until an absolute path is constructed');
		
		console.log('The .resolve() method works like an iterative "cd" command',
			'for every argument, except that it also works on files and it is abstract');
		console.log(path.resolve());
		console.log(path.resolve(''));
		console.log(path.resolve('.'));
		
		expect(path.resolve()).toEqual(path.resolve('.'));
		expect(path.resolve()).toEqual(path.resolve(''));
		
		expect(posix.resolve('/foo1', '/foo2', 'bar', 'derp.html'))
				.toEqual('/foo2/bar/derp.html');
		expect(posix.resolve('/foo/bar/derp1', '../derp2/file.html'))
				.toEqual('/foo/bar/derp2/file.html');
	});
	xit('shwos that .relative() will return the relative path from arg1 to arg2', () => {
		expect(path.posix.relative('/foo/bar/derp1/hello.html', '/foo/bar/derp2/world.html'))
				.toEqual('../../derp2/world.html');
		
		console.log(posix.normalize(posix.join('/foo/bar/derp1/hello.html', '../')));
	});
	
	xit('shows that .parse() will parse path string into object', () => {
		//console.log(path.parse('/foo/bar/derp.html'));
		
		const p1 = path.posix.parse('/foo/bar/derp.html');
		expect(p1.root).toEqual('/');
		expect(p1.dir).toEqual('/foo/bar');
		expect(p1.base).toEqual('derp.html');
		expect(p1.name).toEqual('derp');
		expect(p1.ext).toEqual('.html');
	})
	
	xit('shows that .normalize() will normalize the given path', () => {
		expect(path.normalize('')).toEqual('.');
		//
		expect(path.posix.normalize('/foo/bar/derp1/derp2/../../././derp.html'))
				.toEqual('/foo/bar/derp.html');
	});
	
	xit('shows that .join() will join path parts into one single path', () => {
		expect(path.join('')).toEqual('.');
		
		expect(path.posix.join('/foo', 'bar', 'derp.html')).toEqual('/foo/bar/derp.html');
	});
	
	xit('shows that .isAbsolute() will check if the path is absolute', () => {
		expect(path.isAbsolute('')).toBeFalsy();
		
		expect(path.isAbsolute('/foo/bar')).toBeTruthy();
		expect(path.isAbsolute('/bar/..')).toBeTruthy();
		expect(path.isAbsolute('foo/')).toBeFalsy();
		expect(path.isAbsolute('.')).toBeFalsy();
	});
	
	xit('shows that on property in pathObj may take priority over another', () => {
		const dirOverridesRootAndBaseOverridesNameExt = {
			root: '/ignored/',
			dir: '/foo/bar',
			base: 'derp/fileName.html',
			name: 'derpName',
			ext: '.derpExt'
			
		};
		expect(path.posix.format(dirOverridesRootAndBaseOverridesNameExt))
				.toEqual('/foo/bar/derp/fileName.html');
	});
	
	xit('shows that .format() will format a parsed object into path', () => {
		const pathStr = '/foo/bar/derp.html';
		const pathObj = path.parse(pathStr);
		console.log('parsed obj for ', pathStr, ' is ', pathObj);
		
		expect(path.normalize(path.format(pathObj))).toEqual(path.normalize(pathStr));
	});
	xit('shows that .extname() can extract extension name', () => {
		expect(path.extname('/index.html')).toEqual('.html');
		expect(path.extname('index.coffee.md')).toEqual('.md');
		expect(path.extname('index.')).toEqual('.');
		expect(path.extname('index')).toEqual('');
		expect(path.extname('.index')).toEqual('');
	});
	
	xit('shows that .dirname() will extract directory part of a path', () => {
		expect(path.dirname('/foo/bar/derp')).toEqual('/foo/bar');
	});
	
	xit('shows that .delimiter provides the platform-specific path delimiter', () => {
		expect(path.win32.delimiter).toEqual(';');
		expect(path.posix.delimiter).toEqual(':');
		
		const str = process.env.PATH;
		console.log('process.env.path list: ');
		console.log(str.split(path.delimiter));
	});
	
	xit('shows that basename() will extract last part of a path, similar to the Unix "basename" command', () => {
		const str = '/foo/bar/baz/derp.html';
		expect(path.basename(str)).toEqual('derp.html');
		expect(path.basename(str, '.html')).toEqual('derp');
	});
	xit('can alway work in windows/posix format', () => {
		const filePath = '/tmp/myfile.html';
		console.log('windows format', path.win32.normalize(filePath));
		console.log('posix format', path.posix.normalize(filePath));
		
		expect(path.win32.normalize(filePath)).toEqual('\\tmp\\myfile.html');
		expect(path.posix.normalize(filePath)).toEqual(filePath);
	});

	xit('operates on file system path', () => {
		console.log('current file name ', path.normalize(__filename));
	});
});

