'use strict';

const { getPaths, explode, split, reduce, magnitude, part1, part2 } = require('./solution');

const input = require('fs')
  .readFileSync(__dirname + '/input.txt', 'utf-8')
  .split('\n')
  .map(JSON.parse);

describe('2020 day 18', () => {
  describe('getPaths', () => {
    it('top level items', () => {
      const result = getPaths([1, 2]);
      expect(result).toEqual([
        { path: [], isLeaf: false },
        { path: [0], isLeaf: true },
        { path: [1], isLeaf: true }
      ]);
    });

    it('1 level deep', () => {
      const result = getPaths([[1]]);
      expect(result).toEqual([
        { path: [], isLeaf: false },
        { path: [0], isLeaf: false },
        { path: [0, 0], isLeaf: true }
      ]);
    });
  });

  describe('explode', () => {
    it('not deep enough', () => {
      const result = explode(JSON.parse('[[1,2],[[3,4],5]]'));
      expect(result).toEqual({ changed: false });
    });

    it('no left number', () => {
      const result = explode(JSON.parse('[[[[[9,8],1],2],3],4]'));
      expect(result.v).toEqual(JSON.parse('[[[[0,9],2],3],4]'));
    });

    it('no right number', () => {
      const result = explode(JSON.parse('[7,[6,[5,[4,[3,2]]]]]'));
      expect(result.v).toEqual(JSON.parse('[7,[6,[5,[7,0]]]]'));
    });

    it('in middle', () => {
      const result = explode(JSON.parse('[[6,[5,[4,[3,2]]]],1]'));
      expect(result.v).toEqual(JSON.parse('[[6,[5,[7,0]]],3]'));
    });

    it('only first', () => {
      const result = explode(JSON.parse('[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]'));
      expect(result.v).toEqual(JSON.parse('[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]'));
    });
  });

  describe('split', () => {
    it('only first', () => {
      const result = split(JSON.parse('[[[[0,7],4],[15,[0,13]]],[1,1]]'));
      expect(result.v).toEqual(JSON.parse('[[[[0,7],4],[[7,8],[0,13]]],[1,1]]'));
    });

    it('no above 10', () => {
      const result = split(JSON.parse('[[[[0,7],4],[[7,8],[6,0]]],[8,1]]'));
      expect(result).toEqual({ changed: false });
    });
  });

  describe('reduce', () => {
    it('explodes and splits', () => {
      const result = reduce(JSON.parse('[[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]'));
      expect(result).toEqual(JSON.parse('[[[[0,7],4],[[7,8],[6,0]]],[8,1]]'));
    });

    it('no change when no need', () => {
      const result = reduce(JSON.parse('[[[[0,7],4],[[7,8],[6,0]]],[8,1]]'));
      expect(result).toEqual(JSON.parse('[[[[0,7],4],[[7,8],[6,0]]],[8,1]]'));
    });
  });

  describe('magnitude', () => {
    it('calculates', () => {
      expect(magnitude(JSON.parse('[[1,2],[[3,4],5]]'))).toEqual(143);
      expect(magnitude(JSON.parse('[[[[0,7],4],[[7,8],[6,0]]],[8,1]]'))).toEqual(1384);
    });
  });

  describe('part 1', () => {
    it('example', () => {
      const vs = [
        '[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]',
        '[[[5,[2,8]],4],[5,[[9,9],0]]]',
        '[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]',
        '[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]',
        '[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]',
        '[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]',
        '[[[[5,4],[7,7]],8],[[8,3],8]]',
        '[[9,3],[[9,9],[6,[4,9]]]]',
        '[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]',
        '[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]'
      ].map(JSON.parse);
      expect(part1(vs)).toEqual(4140);
    });

    xit('solution', () => {
      console.log('result 1', part1(input));
    });
  });

  describe('part 2', () => {
    it('example', () => {
      const vs = [
        '[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]',
        '[[[5,[2,8]],4],[5,[[9,9],0]]]',
        '[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]',
        '[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]',
        '[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]',
        '[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]',
        '[[[[5,4],[7,7]],8],[[8,3],8]]',
        '[[9,3],[[9,9],[6,[4,9]]]]',
        '[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]',
        '[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]'
      ].map(JSON.parse);
      expect(part2(vs)).toEqual(3993);
    });

    xit('solution', () => {
      console.log('result 2', part2(input));
    });
  });
});
