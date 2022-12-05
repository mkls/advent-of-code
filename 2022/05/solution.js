'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars

// const state = [['N', 'Z'], ['D', 'C', 'M'], ['P']];
const state = [
  ['N', 'V', 'C', 'S'],
  ['S', 'N', 'H', 'J', 'M', 'Z'],
  ['D', 'N', 'J', 'G', 'T', 'C', 'M'],
  ['M', 'R', 'W', 'J', 'F', 'D', 'T'],
  ['H', 'F', 'P'],
  ['J', 'H', 'Z', 'T', 'C'],
  ['Z', 'L', 'S', 'F', 'Q', 'R', 'P', 'D'],
  ['W', 'P', 'F', 'D', 'H', 'L', 'S', 'C'],
  ['Z', 'G', 'N', 'F', 'P', 'M', 'S', 'D']
];

exports.main = input => {
  const [rawDrawing, rawMoves] = input.split('\n\n');
  const moves = rawMoves.split('\n').flatMap(l => {
    const [, count, , from, , to] = l.split(' ').map(Number);
    return _.range(count).map(() => ({ from, to }));
  });

  moves.forEach(({ from, to }) => {
    const item = state[from - 1].shift();
    state[to - 1].unshift(item);
  });
  return state.map(s => s[0]).join('');
};
