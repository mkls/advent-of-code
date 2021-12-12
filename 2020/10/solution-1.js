'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars

const lines = require('fs')
  .readFileSync(__dirname + '/actual.txt', 'utf-8')
  .split('\n')
  .map(Number)
  .sort((a, b) => a - b);

const all = [0, ...lines, Math.max(...lines) + 3];

const diffs = all.slice(1).map((v, i) => v - all[i]);

const frequency = diffs.reduce((accu, v) => {
  accu[v] = (accu[v] || 0) + 1;
  return accu;
}, {});

console.log(frequency['1'] * frequency['3']);
