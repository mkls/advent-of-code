'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars

exports.main = input => {
  return input.split('').findIndex((value, index, arr) => {
    if (index < 4) return false;
    const window = arr.slice(index - 4, index);
    return window.every(c => window.filter(x => x === c).length === 1);
  });
};
