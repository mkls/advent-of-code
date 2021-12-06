'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars

const groups = require('fs')
  .readFileSync(__dirname + '/actual.txt', 'utf-8')
  .split('\n\n')
  .map(g => g.replace(/\n/g, ''))
  .map(t => t.split(''))
  .map(_.uniq)
  .map(d => d.length)
  .reduce(_.add);

console.log(groups);
