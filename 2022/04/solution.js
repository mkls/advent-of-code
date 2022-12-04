'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars

exports.main = input => {
  return input
    .split('\n')
    .map(l => l.split(',').map(r => r.split('-').map(Number)))
    .filter(
      ([rangeA, rangeB]) =>
        (rangeA[0] >= rangeB[0] && rangeA[1] <= rangeB[1]) ||
        (rangeB[0] >= rangeA[0] && rangeB[1] <= rangeA[1])
    ).length;
};
