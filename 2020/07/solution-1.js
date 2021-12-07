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
    const colors = content.map(c => c.replace(/^\d+ /, ''));
    ruleMap[bag] = colors;
  });

console.log(ruleMap);

const resolveContent = bag => {
  return [bag, ...ruleMap[bag].flatMap(resolveContent)];
};

const possibleContents = Object.values(ruleMap).map(content => content.flatMap(resolveContent));

const canContainIt = possibleContents.filter(cs => cs.includes('shiny gold'));

console.log(canContainIt.length);
