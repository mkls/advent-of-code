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
  .filter(([s, e]) => s.x === e.x || s.y === e.y || Math.abs(s.y - e.y) == Math.abs(s.x - e.x));

const getRange = (s, e) => {
  if (e >= s) {
    return range(s, e + 1);
  }
  return range(e, s + 1).reverse();
};

const pointsOfLine = line => {
  if (line[0].x === line[1].x) {
    return getRange(line[0].y, line[1].y).map(y => ({ x: line[0].x, y }));
  }
  if (line[0].y === line[1].y) {
    return getRange(line[0].x, line[1].x).map(x => ({ x, y: line[0].y }));
  }
  const xRange = getRange(line[0].x, line[1].x);
  const yRange = getRange(line[0].y, line[1].y);

  return xRange.map((x, i) => ({ x, y: yRange[i] }));
};

const allPointsToMark = lines.flatMap(pointsOfLine);

const counter = {};
allPointsToMark.map(JSON.stringify).map(id => {
  counter[id] = (counter[id] || 0) + 1;
});

const twice = filter(counter, value => value >= 2).length;
console.dir(twice, { depth: null });
