'use strict';

const _ = require('lodash');

const fishes = require('fs')
  .readFileSync(__dirname + '/actual.txt', 'utf-8')
  .split(',')
  .map(Number);

const add = (counter, key, value) => {
  counter[key] = (counter[key] || 0) + value;
};

let counts = {};
fishes.forEach(fish => add(counts, fish, 1));

_.range(256).forEach(() => {
  const nextCounts = {};
  Object.entries(counts).forEach(([day, count]) => {
    day = +day;
    if (day === 0) {
      add(nextCounts, 6, count);
      add(nextCounts, 8, count);
    } else {
      add(nextCounts, day - 1, count);
    }
  });
  counts = nextCounts;
});

console.log(_.sum(Object.values(counts)));
