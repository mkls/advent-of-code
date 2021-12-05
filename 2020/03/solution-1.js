'use strict';

const lines = require('fs')
  .readFileSync(__dirname + '/actual.txt', 'utf-8')
  .split('\n');

const pos = [0, 0];
const dir = [1, 3];

const isTree = (x, y) => {
  const row = lines[x];
  const point = row[y % row.length];
  return point === '#';
}

let treeCount = 0;

do {
  if (isTree(...pos)) treeCount++;

  pos[0] += dir[0];
  pos[1] += dir[1];

} while (pos[0] < lines.length)

console.log(treeCount);