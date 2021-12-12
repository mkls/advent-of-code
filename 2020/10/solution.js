'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars

const adapters = require('fs')
  .readFileSync(__dirname + '/actual.txt', 'utf-8')
  .split('\n')
  .map(Number)
  .sort((a, b) => a - b);

const getOptionCount = _.memoize(start => {
  const matches = adapters.filter(a => a > start && a <= start + 3);

  if (matches.length === 0) return 1;

  return _.sum(matches.map(getOptionCount));
});

console.log(getOptionCount(0));
