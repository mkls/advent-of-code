'use strict';

const lines = require('fs').readFileSync(__dirname + '/actual.txt', 'utf-8').split('\n').map(Number);

let increases = 0;
for (let i = 3; i < lines.length; i++) {
  const current = lines[i] + lines[i - 1] + lines[i - 2];
  const prev = lines[i - 1] + lines[i - 2] + lines[i - 3];
  if (current > prev) {
    increases++;
  }
}
console.log(increases);
