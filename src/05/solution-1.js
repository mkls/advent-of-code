'use strict';

const { range, filter } = require('lodash');

console.log('\n\n\n\n---- Script start -----\n\n\n\n');

const toCoordinates = t => {
  const parsed = t.split(',').map(Number);
  return { x: parsed[0], y: parsed[1] };
};

let lines = require('fs')
  .readFileSync(__dirname + '/actual.txt', 'utf-8')
  .split('\n')
  .map(line => line.split(' -> '))
  .map(([s, e]) => [toCoordinates(s), toCoordinates(e)])
  .sort(line => line.sort((a, b) => (a.x == b.x ? a.y - b.y : a.x - b.x)));

lines = lines
  .filter(([s, e]) => s.x === e.x || s.y === e.y)


const getPointsOfLine = line => {
  if (line[0].x === line[1].x) {
    return range(line[0].y, line[1].y + 1).map(y => ({ x: line[0].x, y }));
  }
  if (line[0].y === line[1].y) {
    return range(line[0].x, line[1].x + 1).map(x => ({ x, y: line[0].y }));
  }
};

const allPointsToMark = lines.flatMap(getPointsOfLine);


const counter = {};
allPointsToMark.map(JSON.stringify).map(id => {
  counter[id] = (counter[id] || 0) + 1
})

const twice = filter(counter, value => value >= 2).length;
console.dir(twice, { depth: null });