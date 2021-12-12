'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars

const input = require('fs')
  .readFileSync(__dirname + '/actual.txt', 'utf-8')
  .split('\n')
  .map(Number);

const lookBack = 25;

const res = input.find((v, i) => {
  if (i <= lookBack) return false;

  const preamble = input.slice(i - lookBack, i);
  const options = preamble
    .flatMap((a, i) => preamble.map((b, j) => (i === j ? null : a + b)))
    .filter(o => o !== null);

  return !options.includes(v);
});

console.log(res);
