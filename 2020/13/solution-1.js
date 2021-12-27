'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars

module.exports = input => {
  let [startTime, busIds] = input.split('\n');
  startTime = Number(startTime);
  busIds = busIds
    .split(',')
    .filter(id => id !== 'x')
    .map(Number);

  const waitTimes = busIds.map(id => ({
    id,
    wait: (Math.floor(startTime / id) + 1) * id - startTime
  }));

  const minWait = _.minBy(waitTimes, 'wait');
  return minWait.id * minWait.wait;
};
