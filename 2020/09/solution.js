'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars

const input = require('fs')
  .readFileSync(__dirname + '/actual.txt', 'utf-8')
  .split('\n')
  .map(Number);

const lookBack = 25;

const result1 = input.find((v, i) => {
  if (i <= lookBack) return false;

  const preamble = input.slice(i - lookBack, i);
  const options = preamble
    .flatMap((a, i) => preamble.map((b, j) => (i === j ? null : a + b)))
    .filter(o => o !== null);

  return !options.includes(v);
});

console.log({ result1 });

const res = _.range(0, input.length - 1)
  .flatMap(start => _.range(start + 2, input.length).map(end => input.slice(start, end)))
  .find(range => _.sum(range) === result1);

console.log(Math.min(...res) + Math.max(...res));
