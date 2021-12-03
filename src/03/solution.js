'use strict';

const { groupBy } = require('lodash');

const rawLines = require('fs')
  .readFileSync(__dirname + '/actual.txt', 'utf-8')
  .split('\n');

const lines = rawLines.map(line => line.split('').map(Number));

const numFromBinary = bits =>
  bits.reverse().reduce((accu, bit, index) => accu + bit * 2 ** index, 0);

const filterByCommonness = (binaries, filter, index = 0) => {
  if (binaries.length === 1) {
    return binaries;
  }

  const groupedByIndex = [];
  binaries.forEach(bits =>
    bits.forEach((bit, i) => {
      groupedByIndex[i] = (groupedByIndex[i] || []).concat(bit);
    })
  );

  const counts = groupedByIndex.map(group => {
    const zeros = group.filter(d => d === 0).length;
    const ones = group.filter(d => d === 1).length;
    return { ones, zeros };
  });

  const bitToKeep = filter(counts[index])
  const kept = binaries.filter(num => num[index] === bitToKeep);
  // console.log({ counts, bitToKeep, kept });

  return filterByCommonness(kept, filter, index + 1);
};


let [oxigen] = filterByCommonness(lines, d => d.ones >= d.zeros ? 1 : 0);
let [co2] = filterByCommonness(lines, d => d.zeros <= d.ones ? 0 : 1);

oxigen = numFromBinary(oxigen);
co2 = numFromBinary(co2);
console.log({ co2, oxigen, result: co2 * oxigen });
