'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars

const input = require('fs').readFileSync(__dirname + '/actual.txt', 'utf-8');
let [points, folds] = input.split('\n\n');
points = points.split('\n').map(line => line.split(',').map(Number));
folds = folds.split('\n').map(l => {
  const [axis, value] = l.replace('fold along ', '').split('=');
  return { axis, value: +value };
});

const fold = (points, axis, foldPoint) => {
  const folded = points.map(([x, y]) => {
    if (axis === 'y') {
      return y > foldPoint ? [x, foldPoint - (y - foldPoint)] : [x, y];
    } else {
      return x > foldPoint ? [foldPoint - (x - foldPoint), y] : [x, y];
    }
  });
  return _.uniqBy(folded, JSON.stringify);
};

console.log(fold(points, folds[0].axis, folds[0].value).length);
