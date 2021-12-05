'use strict';

const { range, groupBy, filter } = require('lodash');

console.log('\n\n ---- Script start ----- \n\n');

const lines = require('fs')
  .readFileSync(__dirname + '/actual.txt', 'utf-8')
  .split('\n')
  .map(line => line.split(' -> ').map(c => c.split(',').map(Number)));

const getRange = (start, end) =>
  start <= end ? range(start, end + 1) : range(end, start + 1).reverse();

const pointsForLine = ([start, end]) => {
  if (start[0] === end[0]) {
    return getRange(start[1], end[1]).map(y => [start[0], y]);
  }
  if (start[1] === end[1]) {
    return getRange(start[0], end[0]).map(x => [x, start[1]]);
  }
  if (Math.abs(start[0] - end[0]) === Math.abs(start[1] - end[1])) {
    const xrange = getRange(start[0], end[0]);
    const yrange = getRange(start[1], end[1]);
    return xrange.map((x, i) => [x, yrange[i]]);
  }
  return [];
};

const points = lines.flatMap(pointsForLine);

const result = filter(groupBy(points, JSON.stringify), value => value.length >= 2).length;

console.log(result);
