'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars

const ruleMap = {};

require('fs')
  .readFileSync(__dirname + '/actual.txt', 'utf-8')
  .split('\n')
  .map(line => {
    let [bag, content] = line.split(' bags contain ');
    content = content.replace(/ bags?\.?/g, '');
    if (content === 'no other') {
      ruleMap[bag] = [];
      return;
    }
    content = content.split(/, /);
    ruleMap[bag] = content.map(c => ({
      color: c.replace(/^\d+ /, ''),
      count: +c.slice(0, 1)
    }));
  });

const getCount = color => {
  const rule = ruleMap[color];
  if (rule.length === 0) return 0;
  const inside = rule.map(r => r.count + r.count * getCount(r.color));
  return _.sum(inside);
};

console.log(getCount('shiny gold'));
