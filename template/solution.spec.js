'use strict';

const solution = require('./solution');

const lines = require('fs')
  .readFileSync(__dirname + '/input.txt', 'utf-8')
  .split('\n');

describe('2021 day x', () => {
  it('calculates', () => {
    const result = solution.part1(['']);
    expect(result).toEqual(1);
  });
});
