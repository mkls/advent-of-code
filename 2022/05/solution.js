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
  const [, rawMoves] = input.split('\n\n');
  const moves = rawMoves.split('\n').map(l => {
    const [, count, , from, , to] = l.split(' ').map(Number);
    return { count, from, to };
  });

  moves.forEach(({ count, from, to }) => {
    const toMove = state[from - 1].slice(0, count);
    state[from - 1] = state[from - 1].slice(count);
    state[to - 1] = [...toMove, ...state[to - 1]];
  });
  return state.map(s => s[0]).join('');
};
