'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars

const scoreForLetter = {
  X: 1,
  Y: 2,
  Z: 3
}
const wins = ['A Y', 'B Z', 'C X'];
const draws = ['A X', 'B Y', 'C Z'];

exports.main = input => {
  return _.sum(input.split('\n').map(l => {
    const shapeScore = scoreForLetter[l[2]];
    return shapeScore + getGameScore(l);
  }));
};

const getGameScore = l => {
  if (wins.includes(l)) return 6;
  if (draws.includes(l)) return 3;
  return 0;
}