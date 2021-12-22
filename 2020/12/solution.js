'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars
const { add, multiply } = require('mathjs');

const instructions = require('fs')
  .readFileSync(__dirname + '/actual.txt', 'utf-8')
  .split('\n')
  .map(l => {
    const action = l.slice(0, 1);
    const value = Number(l.slice(1));
    return { action, value };
  });

const initialState = { waypoint: [10, 1], loc: [0, 0] };

const moves = {
  N: ([x, y], v) => [x, y + v],
  S: ([x, y], v) => [x, y - v],
  E: ([x, y], v) => [x + v, y],
  W: ([x, y], v) => [x - v, y]
};

const clockWiseRotations = {
  90: [
    [0, 1],
    [-1, 0]
  ],
  180: [
    [-1, 0],
    [0, -1]
  ],
  270: [
    [0, -1],
    [1, 0]
  ]
};
const nextState = (state, { action, value }) => {
  if ('NSEW'.includes(action)) {
    return { ...state, waypoint: moves[action](state.waypoint, value) };
  }
  if (action === 'F') {
    return {
      ...state,
      loc: add(state.loc, multiply(value, state.waypoint))
    };
  }
  const rotation = action === 'R' ? value : 360 - value;
  return { ...state, waypoint: multiply(clockWiseRotations[rotation], state.waypoint) };
};

exports.solve = () => {
  const finalState = instructions.reduce(nextState, initialState);
  console.log(finalState);

  const result = Math.abs(finalState.loc[0]) + Math.abs(finalState.loc[1]);
  console.log(result);
};
