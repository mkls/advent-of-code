'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars

const rawGrid = require('fs')
  .readFileSync(__dirname + '/actual.txt', 'utf-8')
  .split('\n')
  .map(l => l.split(''));

const maxY = rawGrid.length - 1;
const maxX = rawGrid[0].length - 1;

const startingPoints = {};
rawGrid.forEach((row, y) =>
  row.forEach((value, x) => {
    if (value !== '.') {
      startingPoints[`${x},${y}`] = value;
    }
  })
);

const moveTarget = (location, movingValue) => {
  const [x, y] = location.split(',').map(Number);
  return movingValue === '>' ? `${x === maxX ? 0 : x + 1},${y}` : `${x},${y === maxY ? 0 : y + 1}`;
};

const move = (points, movingValue) => {
  const [movingPoints, nonMovingPoints] = _.partition(
    _.toPairs(points),
    ([location, value]) =>
      value === movingValue && points[moveTarget(location, movingValue)] === undefined
  );
  const newLocations = movingPoints.map(([location, value]) => [
    moveTarget(location, movingValue),
    value
  ]);
  return [_.fromPairs([...newLocations, ...nonMovingPoints]), movingPoints.length > 0];
};

exports.solve = () => {
  let moveCount = 0;
  let wasMovement;
  let points = startingPoints;
  do {
    const [movedEast, didMoveEast] = move(points, '>');
    const [movedSouth, didMoveSouth] = move(movedEast, 'v');
    points = movedSouth;
    wasMovement = didMoveEast || didMoveSouth;
    moveCount++;
  } while (wasMovement);

  console.log('result', moveCount);
};
