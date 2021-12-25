'use strict';

const _ = require('lodash');

exports.printPointMap = pointMap => {
  const points = Object.keys(pointMap).map(s => s.split(',').map(Number));
  exports.printPoints(points);
};

exports.printPoints = points => {
  const xMin = Math.min(...points.map(c => c[0]));
  const xMax = Math.max(...points.map(c => c[0]));
  const yMin = Math.min(...points.map(c => c[1]));
  const yMax = Math.max(...points.map(c => c[1]));

  const board = _.range(yMin, yMax + 1).map(() => _.range(xMin, xMax + 1).map(() => '.'));

  points.forEach(([x, y]) => (board[y - yMin][x - xMin] = '#'));
  const out = board.map(row => row.join('')).join('\n');
  console.log(out);
};

exports.printPointMapWithKnownRange = (points, xMax, yMax) => {
  const board = _.range(0, xMax + 1).map(() => _.range(0, yMax + 1).map(() => '.'));

  _.toPairs(points).forEach(([location, value]) => {
    const [x, y] = location.split(',').map(Number);
    board[y][x] = value;
  });
  const out = board.map(row => row.join('')).join('\n');
  console.log(out);
};
