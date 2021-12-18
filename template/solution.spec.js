'use strict';

const solution = require('./solution');

const lines = require('fs')
  .readFileSync(__dirname + '/input.txt', 'utf-8')
  .split('\n');

describe('2021 day 19', () => {
  it('calculates', () => {
    const result = solution.part1(['']);
    expect(result).toEqual(1);
  });

  it('part 1', () => {
    const result = solution.part1(lines);
    expect(result).toEqual(1);
  });
});
