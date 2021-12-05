'use strict';

console.log('\n\n ---- Script start ----- \n\n');

const lines = require('fs')
  .readFileSync(__dirname + '/example.txt', 'utf-8')
  .split('\n');
