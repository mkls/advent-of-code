'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars

exports.main = input => {
  let [, busIds] = input.split('\n');
  const buses = busIds
    .split(',')
    .map((id, offset) => ({ id: Number(id), offset }))
    .filter(({ id }) => !isNaN(id));

    const largest = _.maxBy(buses, 'id');

  let currentNumber = largest.id - largest.offset;
  while (!buses.every(({ id, offset }) => (currentNumber + offset) % id === 0)) {
    currentNumber += largest.id;
  }
  return currentNumber;
};
