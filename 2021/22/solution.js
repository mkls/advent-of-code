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

exports.splitToNonOverLappingMultiDimension = (toSplit, splitBy) => {
  if (toSplit.length === 2) {
    const xRranges = this.splitToNonOverlappingRanges1D(toSplit[0], splitBy[0]);
    const yRanges = this.splitToNonOverlappingRanges1D(toSplit[1], splitBy[1]);
    return xRranges.flatMap(xRange => yRanges.map(yRange => [xRange, yRange]));
  }
  const xRranges = this.splitToNonOverlappingRanges1D(toSplit[0], splitBy[0]);
  const yRanges = this.splitToNonOverlappingRanges1D(toSplit[1], splitBy[1]);
  const zRanges = this.splitToNonOverlappingRanges1D(toSplit[2], splitBy[2]);
  return xRranges.flatMap(xRange =>
    yRanges.flatMap(yRange => zRanges.map(zRange => [xRange, yRange, zRange]))
  );
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
