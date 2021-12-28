'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars

exports.main = input => {
  const finalState = input.split('\n').reduce(
    (state, line) => {
      if (line.startsWith('mask')) {
        return { ...state, mask: line.slice(-36) };
      } else {
        const [, addr, value] = line.match(/mem\[(\d+)\] = (\d+)$/);
        return { ...state, memory: { ...state.memory, [addr]: applyMask(+value, state.mask) } };
      }
    },
    { mask: null, memory: {} }
  );

  return _.sum(Object.values(finalState.memory));
};

const applyMask = (value, mask) => {
  const valueAsBinary = value.toString(2).padStart(36, '0');
  const masked = valueAsBinary.split('').map((c, i) => (mask[i] === 'X' ? c : mask[i]));
  return _.sum(masked.reverse().map((bit, i) => Number(bit) * 2 ** i));
};
