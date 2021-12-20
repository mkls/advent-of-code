'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars

const grid = require('fs')
  .readFileSync(__dirname + '/actual.txt', 'utf-8')
  .split('\n')
  .map(l => l.split(''));

const isOutside = ([x, y]) => x < 0 || x >= grid[0].length || y < 0 || y >= grid.length;

const getFirstSeat = (point, dir) => {
  const pointToCheck = [point[0] + dir[0], point[1] + dir[1]];
  if (isOutside(pointToCheck)) return null;
  if (['L', '#'].includes(grid[pointToCheck[1]][pointToCheck[0]])) return pointToCheck;
  return getFirstSeat(pointToCheck, dir);
};

const getNeighbourCoordinates = point =>
  [
    [-1, -1],
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0]
  ]
    .map(dir => getFirstSeat(point, dir))
    .filter(c => c !== null)
    .map(c => `${c[0]},${c[1]}`);

const seatNeighbours = {};
const seatValues = {};

grid.forEach((row, y) => {
  row.forEach((v, x) => {
    if (v === '.') return;
    seatNeighbours[`${x},${y}`] = getNeighbourCoordinates([x, y]);
    seatValues[`${x},${y}`] = v;
  });
});

const iterate = seatValues => {
  const newSeatValues = {};
  let changed = false;
  _.forEach(seatValues, (value, point) => {
    const neigbourCounts = _.countBy(seatNeighbours[point].map(n => seatValues[n]));
    const newValue =
      neigbourCounts['#'] === undefined ? '#' : neigbourCounts['#'] >= 5 ? 'L' : value;
    if (newValue !== value) {
      changed = true;
    }
    newSeatValues[point] = newValue;
  });
  return { changed, newSeatValues };
};

const getFinalState = seatValues => {
  const { changed, newSeatValues } = iterate(seatValues);
  if (!changed) return newSeatValues;
  return getFinalState(newSeatValues);
};

const result = getFinalState(seatValues);
console.log(_.countBy(result));
