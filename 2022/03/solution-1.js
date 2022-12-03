'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars

exports.main = input => {
  const prios = input
    .split('\n')
    .map(l => [l.slice(0, l.length / 2).split(''), l.slice(l.length / 2).split('')])
    .map(([c1, c2]) => c1.find(x => c2.includes(x)))
    .map(getPrio);
  return _.sum(prios);
};

const getPrio = letter => {
  const code = letter.charCodeAt(0);
  return letter.toUpperCase() === letter ? code - 38 : code - 96;
};
