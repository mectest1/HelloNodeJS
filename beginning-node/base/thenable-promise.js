'use strict';

const Q = require('q');

const log = console.log;

Q.when(Q.when('foo')).then(log);

let def = Q.defer();
def.resolve(Q.when('foo'));
def.promise.then(log);

Q.when(null).then(() => Q.when('foo')).then(log);

