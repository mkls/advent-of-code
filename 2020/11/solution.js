'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars

exports.round = input => {
  const getNeighbours = (x, y) =>
    _.range(x - 1, x + 2)
      .flatMap(nx => _.range(y - 1, y + 2).map(ny => [nx, ny]))
      .filter(([nx, ny]) => !(nx == x && ny == y))
      .map(([x, y]) => _.get(input, [y, x]));

  let changed = false;
  const result = input.map((row, y) =>
    row.map((v, x) => {
      if (v === '.') return v;
      const neighbourCounts = _.countBy(getNeighbours(x, y));

      if (v === 'L' && neighbourCounts['#'] === undefined) {
        changed = true;
        return '#';
      }
      if (v === '#' && _.get(neighbourCounts, '#') >= 4) {
        changed = true;
        return 'L';
      }
      return v;
    })
  );
  return { changed, result };
};

exports.part1 = input => {
  let current = input;
  let isChanged;

  do {
    const { changed, result } = this.round(current);
    current = result;
    isChanged = changed;
  } while (isChanged === true);
  return _.countBy(current.flat())['#'];
};
