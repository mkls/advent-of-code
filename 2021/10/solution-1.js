'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars

const lines = require('fs')
  .readFileSync(__dirname + '/actual.txt', 'utf-8')
  .split('\n');

const score = line => {
  let stack = [];
  const cs = line.split('');

  for (let c of cs) {
    if (isOpen(c)) {
      stack.push(c);
    } else if (isMatchingClose(c, _.last(stack))) {
      stack.pop(c);
    } else {
      return points[c];
    }
  }
  return 0;
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
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137
};

const res = lines.map(score);
console.log(_.sum(res));
