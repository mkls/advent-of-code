'use strict';

const lines = require('fs')
  .readFileSync(__dirname + '/actual.txt', 'utf-8')
  .split('\n');

const getRow = b => {
  return b
    .slice(0, 7)
    .split('')
    .map(c => (c === 'F' ? 0 : 1))
    .map((v, i) => v * 2 ** (6 - i))
    .reduce((a, b) => a + b);
};

const getSeat = b => {
  return b
    .slice(-3)
    .split('')
    .map(c => (c === 'R' ? 1 : 0))
    .map((v, i) => v * 2 ** (2 - i))
    .reduce((a, b) => a + b);
};

const seatId = b => getRow(b) * 8 + getSeat(b);

const seatIds = lines.map(seatId).sort((a, b) => a - b);

const beforeMySeat = seatIds.find((id, i) => seatIds[i + 1] > id + 1);
console.log(beforeMySeat + 1);
