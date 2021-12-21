'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars

const allRollResults = _.range(1, 4).flatMap(a =>
  _.range(1, 4).flatMap(b => _.range(1, 4).map(c => [a, b, c]))
);
const rollResults = _.map(_.countBy(allRollResults.map(_.sum)), (count, steps) => ({
  count,
  steps: +steps
}));

const initialState = {
  // a: { pos: 4, points: 0 }, // example
  // b: { pos: 8, points: 0 },
  a: { pos: 6, points: 0 }, // actual
  b: { pos: 8, points: 0 },
  nextTurn: 'a',
  occurance: 1
};

const winCounts = { a: 0, b: 0 };

const nextStates = state => {
  const afterRoll = rollResults.map(({ count, steps }) => ({
    ...state,
    [state.nextTurn]: nextPlayersState(state[state.nextTurn], steps),
    nextTurn: state.nextTurn === 'a' ? 'b' : 'a',
    occurance: state.occurance * count
  }));
  const [hasWinner, noWinner] = _.partition(
    afterRoll,
    state => state.a.points >= 21 || state.b.points >= 21
  );
  hasWinner.forEach(state => {
    if (state.a.points > state.b.points) {
      winCounts.a += state.occurance;
    } else {
      winCounts.b += state.occurance;
    }
  });
  return noWinner;
};

const positions = _.range(1, 11);
const nextPlayersState = (player, steps) => {
  const newPosition = nextPosition(player.pos, steps);
  return { pos: newPosition, points: player.points + newPosition };
};
const nextPosition = (position, steps) => positions[(positions.indexOf(position) + steps) % 10];

const findAllWinners = states => {
  console.log('states.length', states.length);
  if (states.length === 0) return;
  const next = states.flatMap(nextStates);
  return findAllWinners(next);
};
findAllWinners([initialState]);

console.log(winCounts);
