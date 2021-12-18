'use strict';

const solution = require('./solution');

const input = require('fs').readFileSync(__dirname + '/input.txt', 'utf-8');

const trim = map =>
  map
    .split('\n')
    .map(l => l.trim())
    .filter(l => l !== '')
    .join('\n');
const parse = raw =>
  trim(raw)
    .split('\n')
    .map(l => l.split(''));
const print = points => points.map(row => row.join('')).join('\n');

const example = parse(
  trim(`
  L.LL.LL.LL
  LLLLLLL.LL
  L.L.L..L..
  LLLL.LL.LL
  L.LL.LL.LL
  L.LLLLL.LL
  ..L.L.....
  LLLLLLLLLL
  L.LLLLLL.L
  L.LLLLL.LL`)
);

describe('2020 day 11', () => {
  it('fills empties', () => {
    const { result } = solution.round(example);
    expect(print(result)).toEqual(
      trim(`
      #.##.##.##
      #######.##
      #.#.#..#..
      ####.##.##
      #.##.##.##
      #.#####.##
      ..#.#.....
      ##########
      #.######.#
      #.#####.##
    `)
    );
  });

  it('clears crowded', () => {
    const { result } = solution.round(
      parse(`
        #.##.##.##
        #######.##
        #.#.#..#..
        ####.##.##
        #.##.##.##
        #.#####.##
        ..#.#.....
        ##########
        #.######.#
        #.#####.##
      `)
    );
    expect(print(result)).toEqual(
      trim(`
      #.LL.L#.##
      #LLLLLL.L#
      L.L.L..L..
      #LLL.LL.L#
      #.LL.LL.LL
      #.LLLL#.##
      ..L.L.....
      #LLLLLLLL#
      #.LLLLLL.L
      #.#LLLL.##
    `)
    );
  });

  it('part 1 example', () => {
    const result = solution.part1(example);
    expect(result).toEqual(37);
  });

  xit('part 1', () => {
    const result = solution.part1(parse(input));
    expect(result).toEqual(37);
  });
});
