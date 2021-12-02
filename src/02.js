'use strict';

const lines = require('fs').readFileSync('src/02-a.txt', 'utf-8').split('\n').map(l => {
  const parts = l.split(' ');
  return [parts[0], parseInt(parts[1])]
});

let forward = 0;
let depth = 0;

lines.forEach(([dir, c]) => {
  if (dir === 'forward') {
    forward += c;
  } else if (dir === 'down') {
    depth += c;
  } else {
    depth -= c;
  }
});

console.log(forward, depth);

console.log(forward * depth);