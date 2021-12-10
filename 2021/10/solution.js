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
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4
};

const findClosers = line => {
  let stack = [];

  for (let c of line.split('')) {
    if ('([{<'.includes(c)) {
      stack.push(c);
    } else if (c === matchingClosers[_.last(stack)]) {
      stack.pop();
    } else {
      return { valid: false };
    }
  }
  return { valid: true, close: stack.reverse().map(c => matchingClosers[c]) };
};

const score = closers => closers.reduce((accu, item) => 5 * accu + points[item], 0);

const res = lines
  .map(findClosers)
  .filter(r => r.valid)
  .map(r => score(r.close))
  .sort((a, b) => a - b);

console.log(res[Math.floor(res.length / 2)]);
