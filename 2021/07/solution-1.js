'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars

const positions = require('fs')
  .readFileSync(__dirname + '/actual.txt', 'utf-8')
  .split(',')
  .map(Number);

const min = Math.min(...positions);
const max = Math.max(...positions);

const fuelToPosition = _.range(min, max + 1).map(position => {
  const cost = positions.map(p => Math.abs(position - p)).reduce(_.add);
  return cost;
});

const minCost = Math.min(...fuelToPosition);

console.log(minCost);
