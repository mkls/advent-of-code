'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars
const common = require('../../common');  // eslint-disable-line no-unused-vars

const [algorithm, rawImage] = require('fs')
  .readFileSync(__dirname + '/actual.txt', 'utf-8')
  .split('\n\n');

const inputImage = rawImage.split('\n').map(l => l.split(''));
let initialImage = {
  points: {},
  lighPointsSaved: true
};
inputImage.forEach((row, y) =>
  row.forEach((v, x) => {
    if (v === '#') initialImage.points[`${x},${y}`] = true;
  })
);

// common.printPointMap(initialImage.points);

const binaryToInt = bits =>
  _.sum(
    bits
      .slice()
      .reverse()
      .map((b, i) => b * 2 ** i)
  );

const getNewPixel = (image, x, y) => {
  const binary = [
    [x - 1, y - 1],
    [x, y - 1],
    [x + 1, y - 1],
    [x - 1, y],
    [x, y],
    [x + 1, y],
    [x - 1, y + 1],
    [x, y + 1],
    [x + 1, y + 1]
  ]
    .map(([x, y]) => `${x},${y}`)
    .map(c => {
      if (image.lighPointsSaved) {
        return image.points[c] ? 1 : 0;
      } else {
        return image.points[c] ? 0 : 1;
      }
    });
  const index = binaryToInt(binary);
  return algorithm[index];
};

const iterate = image => {
  const points = Object.keys(image.points).map(s => s.split(',').map(Number));
  const xs = points.map(c => c[0]);
  const ys = points.map(c => c[1]);

  const lighPointsSaved = algorithm[0] === '.' ? true : !image.lighPointsSaved;

  const newImage = { points: {}, lighPointsSaved };
  _.range(Math.min(...ys) - 1, Math.max(...ys) + 2).forEach(y => {
    _.range(Math.min(...xs) - 1, Math.max(...xs) + 2).forEach(x => {
      const newPixel = getNewPixel(image, x, y);
      if (lighPointsSaved && newPixel === '#') {
        newImage.points[`${x},${y}`] = true;
      } else if (!lighPointsSaved && newPixel === '.') {
        newImage.points[`${x},${y}`] = true;
      }
    });
  });
  return newImage;
};

const result1 = _.range(0, 2).reduce(iterate, initialImage);
console.log('result 1', Object.keys(result1.points).length);

const result2 = _.range(0, 50).reduce(iterate, initialImage);
console.log('result 2', Object.keys(result2.points).length);
