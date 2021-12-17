'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars
const { find_path } = require('dijkstrajs');

let lines = require('fs')
  .readFileSync(__dirname + '/actual.txt', 'utf-8')
  .split('\n')
  .map(l => l.split('').map(Number));

const largeMap = _.range(0, 5).flatMap(yOffset => {
  return lines.map(line => {
    return _.range(0, 5).flatMap(xOffset => {
      return line.map(v => {
        const newV = v + xOffset + yOffset;
        return newV > 9 ? (newV % 10) + 1 : newV;
      });
    });
  });
});
lines = largeMap;

const allNodes = {};
_.range(0, lines.length).forEach(y =>
  _.range(0, lines[0].length).forEach(x => {
    allNodes[`${x},${y}`] = true;
  })
);

const graph = {};
Object.keys(allNodes).map(p => {
  const [x, y] = p.split(',').map(Number);
  const neighbours = [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1]
  ].filter(([x, y]) => allNodes[`${x},${y}`] !== undefined);

  graph[p] = _.fromPairs(neighbours.map(([x, y]) => [`${x},${y}`, lines[y][x]]));
});

const path = find_path(graph, '0,0', `${lines[0].length - 1},${lines.length - 1}`);

const cost = path.slice(1).reduce((accu, p) => {
  const [x, y] = p.split(',').map(Number);
  return accu + lines[y][x];
}, 0);

console.log(path);
console.log(cost);
