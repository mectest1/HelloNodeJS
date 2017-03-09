'use strict';

const assert = require('assert');
const List = require('./assert-list');
let list = new List();

const log = console.log;
//
log('testing list.count');
assert.equal(list.count, 0);

//
log('testing list.add');
list.add({
	id: 'someId',
	value: 'some value'
});
assert.equal(list.count, 1);

//
log('testing list.clear');
list.clear();
assert.equal(list.count, 0);

//
log('testing list.getIds');
list.add({
	id: 'someId',
	value: 'some value'
});
assert.equal(list.getIds()[0], 'someId');
list.clear();

//
log('testing list.remove');
list.add({
	id: 'someId',
	value: 'someValue'
});
list.remove('someId');
assert.equal(list.count, 0);

//
log('testing list.get');
list.add({
	id: 'someId',
	value: 'some value'
});
assert.equal(list.get('someId').value, 'some value');
list.clear();

//
log('testing list.add throws an error on invalid value');
assert.throws(() => {
	list.add({
		value: 'some vlaue'
	});
}, err => {
	return (err instanceof Error) && ('item must have id' === err.message);
});
