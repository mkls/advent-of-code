'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars

const scoreForLetter = {
  X: 1,
  Y: 2,
  Z: 3
}
const shapeScores = {
  A: { 6: scoreForLetter['Y'], 3: scoreForLetter['X'], 0: scoreForLetter['Z'] },
  B: { 6: scoreForLetter['Z'], 3: scoreForLetter['Y'], 0: scoreForLetter['X'] },
  C: { 6: scoreForLetter['X'], 3: scoreForLetter['Z'], 0: scoreForLetter['Y'] }
}

exports.main = input => {
  const points = input.split('\n').map(l => {
    const score = getGameScore(l);
    return score + shapeScores[l[0]][score];
  });
  return _.sum(points);
};

const getGameScore = l => {
  if (l[2] === 'Z') return 6;
  if (l[2] === 'Y') return 3;
  return 0;
}