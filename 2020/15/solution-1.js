'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars

exports.main = input => {
  const history = input.split(',').map(Number);

  for (let i = history.length; i < 2020; i++) {
    const last = history[i - 1];
    const previousIndexFromBack = history.slice(0, -1).reverse().indexOf(last);
    if (previousIndexFromBack === -1) {
      history.push(0);
    } else {
      const previousIndexFromFront = i - 2 - previousIndexFromBack;
      history.push(i - 1 - previousIndexFromFront);
    }
  }
  return history[history.length - 1];
};
