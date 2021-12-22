'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars

let lines = require('fs')
  .readFileSync(__dirname + '/actual.txt', 'utf-8')
  .split('\n')
  .map(l => {
    const [action, cube] = l.split(' ');
    const range = cube.split(',').map(d => d.slice(2).split('..').map(Number));
    return { action, range };
  });

exports.splitToNonOverlappingRanges1D = (toSplit, splitBy) => {
  const [start, end] = toSplit;
  const [startOther, endOther] = splitBy;

  if (end < startOther || start > endOther) {
    return [[start, end]];
  }

  if (start < startOther && end <= endOther) {
    return [
      [start, startOther - 1],
      [startOther, end]
    ];
  }
  if (start >= startOther && end > endOther) {
    return [
      [start, endOther],
      [endOther + 1, end]
    ];
  }
  if (start >= startOther && end <= endOther) {
    return [[start, end]];
  }
  if (start < startOther && end > endOther) {
    return [
      [start, startOther - 1],
      [startOther, endOther],
      [endOther + 1, end]
    ];
  }
  throw new Error('unhandled split case');
};

exports.allCombinations = optionsBySpot => {
  if (optionsBySpot.length === 0) return [[]];
  return optionsBySpot[0].flatMap(value => {
    const tailCombinations = this.allCombinations(optionsBySpot.slice(1));
    return tailCombinations.map(combination => [value, ...combination]);
  });
};

exports.splitToNonOverLappingMultiDimension = (toSplit, splitBy) => {
  const optionsByAxis =_.range(0, toSplit.length).map(axis =>
    this.splitToNonOverlappingRanges1D(toSplit[axis], splitBy[axis])
  );
  return this.allCombinations(optionsByAxis);
};

const doesContain = (big, small) =>
  big.every(([start, end], axis) => {
    const [smallStart, smallEnd] = small[axis];
    return start <= smallStart && smallEnd <= end;
  });

const doesOverlap = (rangeA, rangeB) =>
  rangeA.every((range, axis) => {
    const [start, end] = range;
    const [otherStart, otherEnd] = rangeB[axis];
    return (
      (otherStart <= start && start <= otherEnd) ||
      (otherStart <= end && end <= otherEnd) ||
      (start <= otherStart && otherEnd <= end)
    );
  });

const itemCountInRange = range =>
  range.reduce((accu, [start, end]) => accu * Math.abs(end - start + 1), 1);

const nextState = (onRanges, line) => {
  const newOnRanges = onRanges
    .flatMap(range =>
      doesOverlap(range, line.range)
        ? this.splitToNonOverLappingMultiDimension(range, line.range)
        : [range]
    )
    .filter(range => !doesContain(line.range, range));
  if (line.action === 'on') {
    newOnRanges.push(line.range);
  }
  return newOnRanges;
};

exports.solve = () => {
  const onRanges = lines.reduce(nextState, []);
  console.log('result', _.sum(onRanges.map(itemCountInRange)));
};
