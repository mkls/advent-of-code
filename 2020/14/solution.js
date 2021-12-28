'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars

exports.main = input => {
  let mask;
  const memory = {};

  for (const line of input.split('\n')) {
    if (line.startsWith('mask')) {
      mask = line.slice(-36);
    } else {
      const [, addr, value] = line.match(/mem\[(\d+)\] = (\d+)$/);
      memory[addr] = Number(value)
        .toString(2)
        .padStart(36, '0')
        .split('')
        .map((c, i) => (mask[i] === 'X' ? c : mask[i]))
        .reverse()
        .map((bit, i) => Number(bit) * 2 ** i)
        .reduce((a, b) => a + b);
    }
  }

  return _.sum(Object.values(memory));
};
