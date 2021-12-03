'use strict';

const { groupBy } = require('lodash');

const rawLines = require('fs')
  .readFileSync(__dirname + '/actual.txt', 'utf-8')
  .split('\n');
// const rawLines = require('fs').readFileSync(__dirname + '/actual.txt', 'utf-8').split('\n');

const numFromBinary = bits =>
  bits.reverse().reduce((accu, bit, index) => accu + bit * 2 ** index, 0);

const lines = rawLines.map(line => line.split('').map(Number));

const groupedByIndex = [];
lines.forEach(bits =>
  bits.forEach((bit, i) => {
    groupedByIndex[i] = (groupedByIndex[i] || []).concat(bit);
  })
);

const counts = groupedByIndex.map(group => {
  const zeros = group.filter(d => d === 0).length;
  const ones = group.filter(d => d === 1).length;
  return { ones, zeros };
});

const mostCommons = counts.map(d => (d.ones > d.zeros ? 1 : 0));
const leastCommons = counts.map(d => (d.ones < d.zeros ? 1 : 0));

console.log({ mostCommons });

const gamma = numFromBinary(mostCommons);
const epsilon = numFromBinary(leastCommons);

console.log({ gamma, epsilon, result: gamma * epsilon });
