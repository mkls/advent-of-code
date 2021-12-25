'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars
const fs = require('fs'); // eslint-disable-line no-unused-vars

const digitChecker =
  ([v1, v2, v3]) =>
  (z, digit) =>
    (z % 26) + v2 === digit ? Math.floor(z / v1) : Math.floor(z / v1) * 26 + digit + v3;

const digitCheckers = [
  digitChecker([1, 13, 8]),
  digitChecker([1, 12, 16]),
  digitChecker([1, 10, 4]),
  digitChecker([26, -11, 1]),
  digitChecker([1, 14, 13]),
  digitChecker([1, 13, 5]),
  digitChecker([1, 12, 0]),
  digitChecker([26, -5, 10]),
  digitChecker([1, 10, 7]),
  digitChecker([26, 0, 2]),
  digitChecker([26, -11, 13]),
  digitChecker([26, -13, 15]),
  digitChecker([26, -13, 14]),
  digitChecker([26, -11, 9])
];
const digits = _.range(1, 10);

exports.solve = () => {
  const validZsByDigit = getValidZsByDigit();

  console.log('result 1', getResult(validZsByDigit, _.last));
  console.log('result 2', getResult(validZsByDigit, _.head));
};

const getResult = (validZsByDigit, extremePicker) =>
  validZsByDigit.reduce(
    ({ z, output }, validZs, index) => {
      const nextDigitOptions = digits
        .map(digit => ({ digit, z: digitCheckers[index](z, digit) }))
        .filter(({ z }) => validZs.includes(z));
      const nextDigit = extremePicker(_.sortBy(nextDigitOptions, 'digit'));
      return { output: `${output}${nextDigit.digit}`, z: nextDigit.z };
    },
    { output: '', z: 0 }
  );

const getPossibleOutputZs = (inputZs, digitIndex) =>
  _.uniq(inputZs.flatMap(z => digits.map(digit => digitCheckers[digitIndex](z, digit))));

const getAllPossibleOutputZs = () => {
  const cachePath = 'temp/output-zs.txt';
  if (fs.existsSync(cachePath)) {
    return fs
      .readFileSync(cachePath, 'utf-8')
      .split('\n')
      .map(l => l.split(',').map(Number));
  }
  const outputZs = [];
  _.range(0, digitCheckers.length).reduce(
    (inputZs, digitIndex) => {
      const outputZsForDigit = getPossibleOutputZs(inputZs, digitIndex);
      console.log('outputsForDigit', digitIndex, outputZsForDigit.length);
      outputZs[digitIndex] = outputZsForDigit;
      return outputZsForDigit;
    },
    [0]
  );
  fs.writeFileSync(cachePath, outputZs.map(l => _.sortBy(l).join(',')).join('\n'));
  return outputZs;
};

const getZsMatchingOutput = (zs, expectedOutputZs, digitIndex) =>
  zs.filter(inputZ =>
    digits.some(digit => expectedOutputZs.includes(digitCheckers[digitIndex](inputZ, digit)))
  );

const getValidZsByDigit = () => {
  const cachePath = 'temp/valid-zs.txt';
  if (fs.existsSync(cachePath)) {
    return fs
      .readFileSync(cachePath, 'utf-8')
      .split('\n')
      .map(l => l.split(',').map(Number));
  }
  const outputZs = getAllPossibleOutputZs();

  const zOutputsForValidNumbers = [];
  zOutputsForValidNumbers[13] = [0];

  _.range(12, -1).forEach(i => {
    zOutputsForValidNumbers[i] = getZsMatchingOutput(
      outputZs[i],
      zOutputsForValidNumbers[i + 1],
      i + 1
    );
    console.log('filtering valid zs', i, zOutputsForValidNumbers[i].length);
  });
  fs.writeFileSync(cachePath, zOutputsForValidNumbers.map(l => l.join(',')).join('\n'));
  return outputZs;
};
