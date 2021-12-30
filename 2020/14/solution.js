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
      const maskedAddreses = getAddresses(addr, mask);
      maskedAddreses.forEach(address => (memory[address] = Number(value)));
    }
  }

  return _.sum(Object.values(memory));
};

const getAddresses = (addr, mask) => {
  const binaryAddr = Number(addr).toString(2).padStart(36, '0');
  const maskedAddresses = binaryAddr.split('').reduce(
    (addresses, bit, i) => {
      if (mask[i] === '0') return addresses.map(a => `${a}${bit}`);
      if (mask[i] === '1') return addresses.map(a => `${a}1`);
      if (mask[i] === 'X') return addresses.flatMap(a => [`${a}0`, `${a}1`]);
    },
    ['']
  );
  return maskedAddresses.map(binaryToInt);
};

const binaryToInt = binary =>
  binary
    .split('')
    .reverse()
    .map((bit, i) => Number(bit) * 2 ** i)
    .reduce((a, b) => a + b);
