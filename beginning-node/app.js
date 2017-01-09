/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var foo = require('./base/foo');
console.log('foo.bar = ' + foo.bar);

var bar = require('./base/bar');
console.log('foo.bar = ' + foo.bar);

const fooConfig = require('./config/foo-config');
console.log(`foo-config.foo = ${fooConfig.foo}`);