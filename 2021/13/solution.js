'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars
const common = require('../../common');

const input = require('fs').readFileSync(__dirname + '/actual.txt', 'utf-8');
let [points, folds] = input.split('\n\n');
points = points.split('\n').map(line => line.split(',').map(Number));
folds = folds.split('\n').map(l => {
  const [axis, value] = l.replace('fold along ', '').split('=');
  return { axis, v: +value };
});

const fold = (points, instr) => {
  const folded = points.map(([x, y]) => {
    if (instr.axis === 'y') {
      return y > instr.v ? [x, instr.v - (y - instr.v)] : [x, y];
    } else {
      return x > instr.v ? [instr.v - (x - instr.v), y] : [x, y];
    }
  });
  return _.uniqBy(folded, JSON.stringify);
};

const res = folds.reduce((points, instr) => fold(points, instr), points);

common.printPoints(res);
