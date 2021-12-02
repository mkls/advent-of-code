'use strict';

const lines = require('fs').readFileSync('src/02-a.txt', 'utf-8').split('\n').map(l => {
  const parts = l.split(' ');
  return [parts[0], parseInt(parts[1])]
});

let forward = 0;
let depth = 0;
let aim = 0;

lines.forEach(([dir, c]) => {
  if (dir === 'forward') {
    forward += c;
    const add = aim * c;
    depth += add;
  } else if (dir === 'down') {
    aim += c;
  } else {
    aim -= c;
  }
  console.log({ forward, depth, aim });
});

console.log(forward, depth);

console.log(forward * depth);