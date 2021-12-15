'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars
const common = require('../../common'); // eslint-disable-line no-unused-vars

const lines = require('fs')
  .readFileSync(__dirname + '/actual.txt', 'utf-8')
  .split('\n')
  .map(l => l.split('').map(Number));

const unvisitedNodes = {};
_.range(0, lines.length).forEach(y =>
  _.range(0, lines[0].length).forEach(x => {
    unvisitedNodes[`${x},${y}`] = { x, y, coords: `${x},${y}`, distance: Infinity };
  })
);
unvisitedNodes['0,0'].distance = 0;
const visitedNodes = {};

const marVisited = coords => {
  if (coords === `${lines.length - 1},${lines.length - 1}`) {
    console.log(unvisitedNodes[coords]);
    process.exit();
  }
  visitedNodes[coords] = unvisitedNodes[coords];
  delete unvisitedNodes[coords]
}

const forever = true;
while (forever) {
  const currentNode = _.minBy(_.toPairs(unvisitedNodes).map(d => d[1]), 'distance');
  const { x, y } = currentNode;
  const neighbours = [`${x - 1},${y}`, `${x + 1},${y}`, `${x},${y - 1}`, `${x},${y + 1}`];
  const unvisitedNeighbours = neighbours.map(cs => unvisitedNodes[cs]).filter(n => n !== undefined);

  unvisitedNeighbours.forEach(node => {
    const newDistance = currentNode.distance + lines[node.y][node.x];
    if (newDistance < node.distance) {
      node.distance = newDistance;
    }
  });
  marVisited(currentNode.coords);
}
