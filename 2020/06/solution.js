'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars

const groups = require('fs')
  .readFileSync(__dirname + '/actual.txt', 'utf-8')
  .split('\n\n')
  .map(t => t.split('\n'))
  .map(g => {
    const qs = _.uniq(g.join('').split(''));
    return qs.filter(q => g.every(a => a.includes(q))).length;
  })
  .reduce(_.add);

console.log(groups);
