'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars

exports.main = input => {
  return _.sum(
    _.chunk(input.split('\n'), 3)
      .map(g => g[0].split('').find(l => g[1].includes(l) && g[2].includes(l)))
      .map(getPrio)
  );
};

const getPrio = letter => {
  const code = letter.charCodeAt(0);
  return letter.toUpperCase() === letter ? code - 38 : code - 96;
};
