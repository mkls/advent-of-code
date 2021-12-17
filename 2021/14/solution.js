'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars

const rules = {};
let [template, rawRules] = require('fs')
  .readFileSync(__dirname + '/actual.txt', 'utf-8')
  .split('\n\n');
rawRules.split('\n').map(l => {
  const [template, insertion] = l.split(' -> ');
  rules[template] = insertion;
});

const addPair = (templ, pair, count) => {
  templ[pair] = (templ[pair] || 0) + count;
};

const chars = template.split('');
const pairs = chars.slice(0, -1).map((c, i) => `${c}${chars[i + 1]}`);
const initialCounts = {};
pairs.forEach(p => addPair(initialCounts, p, 1));

const insert = templ => {
  const newTempl = {};
  _.map(templ, (count, pair) => {
    const insrt = rules[pair];
    addPair(newTempl, `${pair[0]}${insrt}`, count);
    addPair(newTempl, `${insrt}${pair[1]}`, count);
  });
  return newTempl;
};

const res = _.range(0, 40).reduce(insert, initialCounts);

const charCounts = _.toPairs(res).flatMap(([pair, count]) =>
  pair.split('').map(c => ({ c, count }))
);
const summedCounts = _.map(_.groupBy(charCounts, 'c'), (counts, c) => ({
  c,
  count: Math.ceil(_.sumBy(counts, 'count') / 2)
}));
const sorted = _.sortBy(summedCounts, 'count');

console.log(sorted);
console.log(_.last(sorted).count - sorted[0].count);
