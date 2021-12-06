'use strict';

let fishes = require('fs')
  .readFileSync(__dirname + '/actual.txt', 'utf-8')
  .split(',')
  .map(Number);

for (let i = 1; i <= 80; i++) {
  let newFishes = [];

  fishes = fishes.map(fish => {
    if (fish === 0) {
      newFishes.push(8);
      return 6;
    }
    return fish - 1;
  });
  fishes.push(...newFishes);
}

console.log(fishes.length);
