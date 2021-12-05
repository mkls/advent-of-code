'use strict';

console.log('\n\n ---- Script start ----- \n\n');

const numbers = require('fs')
  .readFileSync(__dirname + '/actual.txt', 'utf-8')
  .split('\n')
  .map(Number);

const result = numbers.filter(n => numbers.some(m => numbers.some(l => l + n + m === 2020)));

console.log(result);
console.log(result[0] * result[1] * result[2]);