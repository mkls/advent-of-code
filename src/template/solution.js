'use strict';

console.log('\n\n\n\n---- Script start -----\n\n\n\n');

const lines = require('fs')
  .readFileSync(__dirname + '/example.txt', 'utf-8')
  .split('\n');
