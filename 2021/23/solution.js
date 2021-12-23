'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars
const stringify = require('json-stable-stringify');

// -0-2-4-6-8---
// 0...........|
// 1-|C|B|D|D|--
// 2 |B|C|A|A|
//   ---------

const movePrices = {
  A: 1,
  B: 10,
  C: 100,
  D: 1000
};

const map = {
  '0,0': { parkSpace: true, nextNodes: ['1,0'] },
  '1,0': { parkSpace: true, nextNodes: ['0,0', '2,0'] },
  '2,0': { parkSpace: false, nextNodes: ['1,0', '3,0', '2,1'] },
  '3,0': { parkSpace: true, nextNodes: ['2,0', '4,0'] },
  '4,0': { parkSpace: false, nextNodes: ['3,0', '5,0', '4,1'] },
  '5,0': { parkSpace: true, nextNodes: ['4,0', '6,0'] },
  '6,0': { parkSpace: false, nextNodes: ['5,0', '7,0', '6,1'] },
  '7,0': { parkSpace: true, nextNodes: ['6,0', '8,0'] },
  '8,0': { parkSpace: false, nextNodes: ['7,0', '9,0', '8,1'] },
  '9,0': { parkSpace: true, nextNodes: ['8,0', '10,0'] },
  '10,0': { parkSpace: true, nextNodes: ['9,0'] },

  '2,1': { targetFor: 'A', nextNodes: ['2,0', '2,2'] },
  '2,2': { targetFor: 'A', nextNodes: ['2,1'] },
  '4,1': { targetFor: 'B', nextNodes: ['4,0', '4,2'] },
  '4,2': { targetFor: 'B', nextNodes: ['4,1'] },
  '6,1': { targetFor: 'C', nextNodes: ['6,0', '6,2'] },
  '6,2': { targetFor: 'C', nextNodes: ['6,1'] },
  '8,1': { targetFor: 'D', nextNodes: ['8,0', '8,2'] },
  '8,2': { targetFor: 'D', nextNodes: ['8,1'] }
};

const isHallway = nodeId => map[nodeId].parkSpace !== undefined;

exports.initialState = {
  '2,1': 'C',
  '2,2': 'B',
  '4,1': 'B',
  '4,2': 'C',
  '6,1': 'D',
  '6,2': 'A',
  '8,1': 'D',
  '8,2': 'A'
};

const yLimit = 2;
const belowItemNotFilledOrInvalid = (occupiedPositions, nodeId) => {
  const [x, y] = nodeId.split(',').map(Number);
  return _.range(y + 1, yLimit + 1)
    .map(y => `${x},${y}`)
    .some(
      point =>
        (map[point] && !occupiedPositions[point]) ||
        (occupiedPositions[point] && map[point].targetFor !== occupiedPositions[point])
    );
};

exports.getNextPositions = ({
  occupiedPositions,
  nodeId,
  being,
  startedInHallway = false,
  stepsSoFar = 0,
  visitedNodeIds = []
}) => {
  if (map[nodeId].targetFor === being && !belowItemNotFilledOrInvalid(occupiedPositions, nodeId)) {
    return [];
  }
  return map[nodeId].nextNodes
    .filter(
      nextNodeId =>
        !visitedNodeIds.includes(nextNodeId) && occupiedPositions[nextNodeId] == undefined
    )
    .flatMap(nextNodeId => {
      const nextNode = map[nextNodeId];
      const currentNodeAsTarget =
        nextNode.parkSpace || nextNode.targetFor === being
          ? [{ nodeId: nextNodeId, steps: stepsSoFar + 1 }]
          : [];
      const targetsFromHere = this.getNextPositions({
        occupiedPositions,
        being,
        nodeId: nextNodeId,
        stepsSoFar: stepsSoFar + 1,
        visitedNodeIds: [...visitedNodeIds, nodeId]
      });
      return [...currentNodeAsTarget, ...targetsFromHere].filter(({ nodeId }) => {
        if (belowItemNotFilledOrInvalid(occupiedPositions, nodeId)) return false;
        if (startedInHallway && isHallway(nodeId)) return false;
        return true;
      });
    });
};

exports.getNextStates = occupiedPositions => {
  return Object.entries(occupiedPositions).flatMap(([nodeId, being]) => {
    const nextPositions = this.getNextPositions({
      occupiedPositions,
      nodeId,
      being,
      startedInHallway: map[nodeId].parkSpace !== undefined
    });
    return nextPositions.map(nextPosition => ({
      cost: nextPosition.steps * movePrices[being],
      positions: {
        ..._.omit(occupiedPositions, [nodeId]),
        [nextPosition.nodeId]: being
      }
    }));
  });
};

exports.isSolution = positions =>
  Object.entries(positions).every(([nodeId, being]) => map[nodeId].targetFor === being);

const findCheapestSolution = _.memoize(positionsJson => {
  const positions = JSON.parse(positionsJson);
  if (this.isSolution(positions)) return 0;
  const nextStates = this.getNextStates(positions);
  if (nextStates.length === 0) return Infinity;

  const costs = nextStates.map(
    nextState => nextState.cost + findCheapestSolution(stringify(nextState.positions))
  );
  return Math.min(...costs);
});

exports.findCheapestSolution = findCheapestSolution;

exports.solve = () => {
  const exampleInitialState = {
    '2,1': 'B',
    '2,2': 'A',
    '4,1': 'C',
    '4,2': 'D',
    '6,1': 'B',
    '6,2': 'C',
    '8,1': 'D',
    '8,2': 'A'
  };
  console.log('result for example', findCheapestSolution(stringify(exampleInitialState)));
  console.log('result for 1', findCheapestSolution(stringify(this.initialState)));
};

/*
const manualSolution = [
  ['A', 21],
  ['B', 10],
  ['C', 12],
  ['D', 9]
];
const price = _.sum(manualSolution.map(([type, count]) => movePrices[type] * count));
console.log(price);  // 10321
*/
