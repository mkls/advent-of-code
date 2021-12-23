'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars
const stringify = require('json-stable-stringify');

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
  '2,2': { targetFor: 'A', nextNodes: ['2,1', '2,3'] },
  '2,3': { targetFor: 'A', nextNodes: ['2,2', '2,4'] },
  '2,4': { targetFor: 'A', nextNodes: ['2,3'] },
  '4,1': { targetFor: 'B', nextNodes: ['4,0', '4,2'] },
  '4,2': { targetFor: 'B', nextNodes: ['4,1', '4,3'] },
  '4,3': { targetFor: 'B', nextNodes: ['4,2', '4,4'] },
  '4,4': { targetFor: 'B', nextNodes: ['4,3'] },
  '6,1': { targetFor: 'C', nextNodes: ['6,0', '6,2'] },
  '6,2': { targetFor: 'C', nextNodes: ['6,1', '6,3'] },
  '6,3': { targetFor: 'C', nextNodes: ['6,2', '6,4'] },
  '6,4': { targetFor: 'C', nextNodes: ['6,3'] },
  '8,1': { targetFor: 'D', nextNodes: ['8,0', '8,2'] },
  '8,2': { targetFor: 'D', nextNodes: ['8,1', '8,3'] },
  '8,3': { targetFor: 'D', nextNodes: ['8,2', '8,4'] },
  '8,4': { targetFor: 'D', nextNodes: ['8,3'] }
};

const isHallway = nodeId => map[nodeId].parkSpace !== undefined;

// -0-2-4-6-8---
// 0...........|
// 1-|C|B|D|D|--
// 2 |D|C|B|A|
// 3 |D|B|A|C|
// 4 |B|C|A|A|
//   ---------
const initialState = {
  '2,1': 'C',
  '2,2': 'D',
  '2,3': 'D',
  '2,4': 'B',
  '4,1': 'B',
  '4,2': 'C',
  '4,3': 'B',
  '4,4': 'C',
  '6,1': 'D',
  '6,2': 'B',
  '6,3': 'A',
  '6,4': 'A',
  '8,1': 'D',
  '8,2': 'A',
  '8,3': 'C',
  '8,4': 'A'
};

// #############
// #...........#
// ###B#C#B#D###
//   #D#C#B#A#
//   #D#B#A#C#
//   #A#D#C#A#
//   #########
// eslint-disable-next-line no-unused-vars
const exampleInitialState = {
  '2,1': 'B',
  '2,2': 'D',
  '2,3': 'D',
  '2,4': 'A',
  '4,1': 'C',
  '4,2': 'C',
  '4,3': 'B',
  '4,4': 'D',
  '6,1': 'B',
  '6,2': 'B',
  '6,3': 'A',
  '6,4': 'C',
  '8,1': 'D',
  '8,2': 'A',
  '8,3': 'C',
  '8,4': 'A'
};

const yLimit = 4;
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
  if (this.isSolution(positions)) return { cost: 0, states: [positions] };
  const nextStates = this.getNextStates(positions);
  if (nextStates.length === 0) return null;

  const costs = nextStates
    .map(nextState => {
      const cheapestForState = findCheapestSolution(stringify(nextState.positions));
      if (!cheapestForState) return null;
      return {
        cost: nextState.cost + cheapestForState.cost,
        states: [positions, ...cheapestForState.states]
      };
    })
    .filter(r => r !== null);
  return _.minBy(costs, 'cost');
});

exports.findCheapestSolution = findCheapestSolution;

const printState = state => {
  const grid = _.range(0, 5).map(() => _.range(0, 11).map(() => '-'));
  _.forEach(state, (value, point) => {
    const [x, y] = point.split(',').map(Number);
    grid[y][x] = value;
  });
  console.log('\n');
  console.log(grid.map(line => line.join('')).join('\n'));
};

exports.solve = () => {
  const result = findCheapestSolution(stringify(initialState));
  result.states.forEach(printState);
  console.log('result for 2', result.cost);
};
