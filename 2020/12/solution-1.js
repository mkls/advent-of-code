'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars

const instructions = require('fs')
  .readFileSync(__dirname + '/actual.txt', 'utf-8')
  .split('\n')
  .map(l => {
    const action = l.slice(0, 1);
    const value = Number(l.slice(1));
    return { action, value };
  });

const initialState = { dir: 'E', loc: [0, 0] };

const moves = {
  N: ([x, y], v) => [x, y + v],
  S: ([x, y], v) => [x, y - v],
  E: ([x, y], v) => [x + v, y],
  W: ([x, y], v) => [x - v, y]
};

const nextState = (state, { action, value }) => {
  if ('NSEW'.includes(action)) {
    return { ...state, loc: moves[action](state.loc, value) };
  }
  if (action === 'F') {
    return { ...state, loc: moves[state.dir](state.loc, value) };
  }
  const turn = (value / 90) * (action === 'R' ? 1 : -1);
  const dirs = ['N', 'E', 'S', 'W'];
  const newDir = dirs[(dirs.indexOf(state.dir) + turn + dirs.length) % dirs.length];
  return { ...state, dir: newDir };
};

const finalState = instructions.reduce(nextState, initialState);
console.log(finalState);

const result = Math.abs(finalState.loc[0]) + Math.abs(finalState.loc[1]);
console.log(result);
