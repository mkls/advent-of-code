'use strict';

const _ = require('lodash');

exports.printPoints = points => {
  const xRange = Math.max(...points.map(c => c[0]));
  const yRange = Math.max(...points.map(c => c[1]));

  const board = _.range(0, yRange + 1).map(() => _.range(0, xRange + 1).map(() => '.'));

  points.forEach(([x, y]) => board[y][x] = '#')
  const out = board.map(row => row.join('')).join('\n');
  console.log(out);
};
