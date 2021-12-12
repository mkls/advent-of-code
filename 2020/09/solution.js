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

console.log({ 'result 1': res });


let found = false;
let start = 0;
let end;
while (!found && start < input.length - 2) {
  for (end = start + 2; !found && end < input.length; end++) {
    if (_.sum(input.slice(start, end)) === res) {
      found = true;
    }
  }
  start++;
}

const theRange = input.slice(start -1, end -1);

console.log(Math.min(...theRange) + Math.max(...theRange));
