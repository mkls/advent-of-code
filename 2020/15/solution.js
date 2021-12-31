'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars

exports.main = input => {
  const prePicked = input.split(',').map(Number);
  const lastRoundPicked = new Map();
  let round = 0;
  let currentNumber;

  const pickNumber = number => {
    if (currentNumber !== undefined) {
      lastRoundPicked.set(currentNumber, round);
    }
    round++;
    currentNumber = number;
  };
  prePicked.forEach(pickNumber);

  _.range(prePicked.length, 30000000).forEach(() => {
    const lastTimePicked = lastRoundPicked.get(currentNumber);
    const nextNumber = lastTimePicked ? round - lastTimePicked : 0;
    pickNumber(nextNumber);
  });
  return currentNumber;
};
