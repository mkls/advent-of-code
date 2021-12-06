'use strict';

const _ = require('lodash');

let fishes = require('fs')
  .readFileSync(__dirname + '/actual.txt', 'utf-8')
  .split(',')
  .map(Number);

_.range(80).forEach(() => {
  fishes = fishes.flatMap(fish => {
    if (fish === 0) return [6, 8];
    return fish - 1;
  });
});

console.log(fishes.length);
