'use strict';

const solution = require('./solution');

describe('2021 day 23', () => {
  describe('getNextPositions', () => {
    it('rigth most position from its neighbour', () => {
      const result = solution.getNextPositions({
        occupiedPositions: solution.initialState,
        nodeId: '1,0',
        being: 'C',
        visitedNodeIds: ['2,0']
      });
      expect(result).toEqual([{ nodeId: '0,0', steps: 1 }]);
    });

    it('right positions from 2,0 while 3,0 is visited ', () => {
      const result = solution.getNextPositions({
        occupiedPositions: solution.initialState,
        nodeId: '2,0',
        being: 'C',
        visitedNodeIds: ['3,0']
      });
      expect(result).toEqual([
        { nodeId: '1,0', steps: 1 },
        { nodeId: '0,0', steps: 2 }
      ]);
    });

    it('right positions from 2,0 while 3,0 is visited ', () => {
      const result = solution.getNextPositions({
        occupiedPositions: solution.initialState,
        nodeId: '2,1',
        being: 'C',
        visitedNodeIds: []
      });
      expect(result).toEqual([
        { nodeId: '1,0', steps: 2 },
        { nodeId: '0,0', steps: 3 },
        { nodeId: '3,0', steps: 2 },
        { nodeId: '5,0', steps: 4 },
        { nodeId: '7,0', steps: 6 },
        { nodeId: '9,0', steps: 8 },
        { nodeId: '10,0', steps: 9 }
      ]);
    });

    it('final position is included', () => {
      const result = solution.getNextPositions({
        occupiedPositions: {},
        nodeId: '2,0',
        being: 'A',
        visitedNodeIds: ['3,0']
      });
      expect(result.map(r => r.nodeId)).toEqual(['1,0', '0,0', '2,2']);
    });

    it('does not move into a final position that is not targeted for itself', () => {
      const result = solution.getNextPositions({
        occupiedPositions: {},
        nodeId: '2,0',
        being: 'C',
        visitedNodeIds: ['3,0']
      });
      expect(result.map(r => r.nodeId)).toEqual(['1,0', '0,0']);
    });

    it('should not move to final position if out place items are below it', () => {
      const result = solution.getNextPositions({
        occupiedPositions: { '2,2': 'D' },
        nodeId: '2,0',
        being: 'A',
        visitedNodeIds: ['3,0']
      });
      expect(result.map(r => r.nodeId)).toEqual(['1,0', '0,0']);
    });

    it('should not move from hallway to hallway', () => {
      const result = solution.getNextPositions({
        occupiedPositions: {},
        nodeId: '5,0',
        being: 'A',
        visitedNodeIds: [],
        startedInHallway: true
      });
      expect(result.map(r => r.nodeId)).toEqual(['2,2']);
    });

    it('should not move an item already in its final location', () => {
      const result = solution.getNextPositions({
        occupiedPositions: { '2,2': 'A' },
        nodeId: '2,1',
        being: 'A'
      });
      expect(result).toEqual([]);
    });
  });

  describe('getNextStates', () => {
    it('returns empty array for stuck state', () => {
      const result = solution.getNextStates({
        '4,2': 'C',
        '8,1': 'D',
        '8,2': 'A',
        '1,0': 'C',
        '3,0': 'B',
        '5,0': 'B',
        '9,0': 'D',
        '7,0': 'A'
      });
      expect(result).toEqual([]);
    });
  });

  describe('isSolutionState', () => {
    it('accepts vald solution', () => {
      const isSolution = solution.isSolution({
        '2,1': 'A',
        '2,2': 'A',
        '4,1': 'B',
        '4,2': 'B',
        '6,1': 'C',
        '6,2': 'C',
        '8,1': 'D',
        '8,2': 'D'
      });
      expect(isSolution).toEqual(true);
    });

    it('does not accept non solution', () => {
      const isSolution = solution.isSolution({
        '2,1': 'A',
        '2,2': 'A',
        '4,1': 'B',
        '4,2': 'B',
        '6,1': 'C',
        '6,2': 'C',
        '9,0': 'D',
        '8,2': 'D'
      });
      expect(isSolution).toEqual(false);
    });
  });

  describe('findCheapestSolution', () => {
    it('final state', () => {
      const result = solution.findCheapestSolution(
        '{"2,1":"A","2,2":"A","4,1":"B","4,2":"B","6,1":"C","6,2":"C","8,1":"D","8,2":"D"}'
      );
      expect(result).toEqual(0);
    });

    it('one away from for final', () => {
      const result = solution.findCheapestSolution(
        '{"2,2":"A","4,1":"B","4,2":"B","6,1":"C","6,2":"C","8,1":"D","8,2":"D","9,0":"A"}'
      );
      expect(result).toEqual(8);
    });

    it('stuck state', () => {
      const result = solution.findCheapestSolution(
        '{"1,0":"C","3,0":"B","4,2":"C","5,0":"B","7,0":"A","8,1":"D","8,2":"A","9,0":"D"}'
      );
      expect(result).toEqual(Infinity);
    });
  });
});
