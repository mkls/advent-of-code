'use strict';

const rawLines = require('fs').readFileSync(__dirname + '/example.txt', 'utf-8').split('\n');
// const rawLines = require('fs').readFileSync(__dirname + '/actual.txt', 'utf-8').split('\n');

const result = rawLines.map(line => {
  return +line;
});

console.log(result);
