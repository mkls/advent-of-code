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

const pointsForCube = range =>
  _.range(range[0][0], range[0][1] + 1).flatMap(x =>
    _.range(range[1][0], range[1][1] + 1).flatMap(y =>
      _.range(range[2][0], range[2][1] + 1).map(z => `${x},${y},${z}`)
    )
  );

lines = lines.slice(0, 20);

const reactor = {};

lines.forEach(line => {
  const points = pointsForCube(line.range);
  if (line.action === 'on') {
    points.forEach(point => {
      reactor[point] = true;
    });
  } else {
    points.forEach(point => {
      if (reactor[point]) {
        delete reactor[point];
      }
    });
  }
});

console.log(Object.keys(reactor).length);
