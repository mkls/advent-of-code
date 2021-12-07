'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars

const positions = require('fs')
  .readFileSync(__dirname + '/actual.txt', 'utf-8')
  .split(',')
  .map(Number);

const min = Math.min(...positions);
const max = Math.max(...positions);

const cost = _.memoize(diff => _.sum(_.range(1, diff + 1)));

const fuelToPosition = _.range(min, max + 1).map(target => {
  const costsToHere = positions.map(p => cost(Math.abs(target - p)));
  return _.sum(costsToHere);
});

const minCost = Math.min(...fuelToPosition);

console.log(minCost);
