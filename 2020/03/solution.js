'use strict';

const lines = require('fs')
  .readFileSync(__dirname + '/actual.txt', 'utf-8')
  .split('\n');

const isTree = (x, y) => {
  const row = lines[x];
  const point = row[y % row.length];
  return point === '#';
}

const dirs = [
  [1, 1],
  [1, 3],
  [1, 5],
  [1, 7],
  [2, 1],
]
let treeCounts = [];

dirs.forEach((dir, i) => {
  const pos = [0, 0];
  do {
    if (isTree(...pos)) {
      treeCounts[i] = (treeCounts[i] || 0) + 1;
    }

    pos[0] += dir[0];
    pos[1] += dir[1];

  } while (pos[0] < lines.length)
})

console.log(treeCounts.reduce((a, d) => a * d, 1));