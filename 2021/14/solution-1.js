'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars
const common = require('../../common'); // eslint-disable-line no-unused-vars

const rules = {};
let [template, rawRules] = require('fs')
  .readFileSync(__dirname + '/actual.txt', 'utf-8')
  .split('\n\n');
rawRules.split('\n').map(l => {
  const [template, insertion] = l.split(' -> ');
  rules[template] = insertion;
});

const insert = template => {
  const chars = template.split('');
  const pairs = chars.slice(0, -1).map((c, i) => `${c}${chars[i + 1]}`);

  return pairs.map(pair => pair[0] + rules[pair]).join('') + _.last(chars);
};

const res = _.range(0, 10).reduce(insert, template);

console.log(res.length);

const counts = _.sortBy(_.toPairs(_.countBy(res.split(''))).map(c => c[1]));
console.log(_.last(counts) - counts[0]);
