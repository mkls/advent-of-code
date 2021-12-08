'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars

const lines = require('fs')
  .readFileSync(__dirname + '/example.txt', 'utf-8')
  .split('\n')
  .map(l => {
    const [input, out] = l.split(' | ');
    return { in: input.split(' '), out: out.split(' ') };
  });

// 1 -> 2
// 7 -> 3
// 4 -> 4
// 8 -> 7

const res = lines.flatMap(l => l.out).filter(out => [2, 3, 4, 7].includes(out.length)).length;
console.log(res);
