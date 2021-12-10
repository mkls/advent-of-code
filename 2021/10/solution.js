'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars

const lines = require('fs')
  .readFileSync(__dirname + '/actual.txt', 'utf-8')
  .split('\n');

const findClosers = line => {
  let stack = [];
  const cs = line.split('');

  for (let c of cs) {
    if (isOpen(c)) {
      stack.push(c);
    } else if (isMatchingClose(c, _.last(stack))) {
      stack.pop(c);
    } else {
      return { valid: false };
    }
  }
  return { valid: true, close: stack.reverse().map(c => matchingClosers[c]) };
};

const isOpen = c => '([{<'.includes(c);
const isMatchingClose = (c, open) => matchingClosers[open] === c;

const matchingClosers = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>'
};

const points = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4
};

const score = closers =>
  closers.reduce((accu, item) => {
    return 5 * accu + points[item];
  }, 0);

const res = lines
  .map(findClosers)
  .filter(r => r.valid)
  .map(r => score(r.close))
  .sort((a, b) => a - b);

console.log(res[Math.floor(res.length / 2)]);
