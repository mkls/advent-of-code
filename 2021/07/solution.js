'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars

const positions = require('fs')
  .readFileSync(__dirname + '/example.txt', 'utf-8')
  .split(',')
  .map(Number);

const min = Math.min(...positions);
const max = Math.max(...positions);

const cost = (a, b) => {
  const diff = Math.abs(a - b);
  return _.sum(_.range(1, diff + 1));
};

const fuelToPosition = _.range(min, max + 1).map(position => {
  return positions.map(p => cost(p, position)).reduce(_.add);
});

const minCost = Math.min(...fuelToPosition);

console.log(minCost);
