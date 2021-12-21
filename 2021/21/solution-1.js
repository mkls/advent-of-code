'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars

const example = [
  { points: 0, position: 4 },
  { points: 0, position: 8 }
];
const actual = [
  { points: 0, position: 6 },
  { points: 0, position: 8 }
];
const players = actual;

let rollTime = 0;
let diceState = 0;
const rollDice = () => {
  rollTime++;
  diceState++;
  if (diceState > 100) diceState = 1;
  return diceState;
};

const positions = _.range(1, 11);

const doTurn = player => {
  const steps = _.sum([rollDice(), rollDice(), rollDice()]);
  const pos = positions[(positions.indexOf(player.position) + steps) % 10];
  player.position = pos;
  player.points += pos;
};

let playersTurn = 0;
do {
  console.log(players);
  doTurn(players[playersTurn]);
  playersTurn = playersTurn ? 0 : 1;
} while (players[0].points < 1000 && players[1].points < 1000);

console.log(rollTime);
console.log(players);
