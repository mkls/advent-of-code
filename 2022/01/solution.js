'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars

exports.main = input => {
  const caloriesPerElf = input.split('\n\n').map(l => _.sum(l.split('\n').map(Number)));
  return _.sum(caloriesPerElf.sort((a, b) => b - a).slice(0, 3));
};
