'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars

const lines = require('fs')
  .readFileSync(__dirname + '/actual.txt', 'utf-8')
  .split('\n');

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

const score = line => {
  let stack = [];

  for (let c of line.split('')) {
    if ('([{<'.includes(c)) {
      stack.push(c);
    } else if (c === matchingClosers[_.last(stack)]) {
      stack.pop();
    } else {
      return points[c];
    }
  }
  return 0;
};

const res = lines.map(score);
console.log(_.sum(res));
