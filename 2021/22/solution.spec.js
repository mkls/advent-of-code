'use strict';

const {
  splitToNonOverlappingRanges1D,
  allCombinations,
  splitToNonOverLappingMultiDimension
} = require('./solution');

describe('2020 day 22', () => {
  it('splitToNonOverlappingRanges1D', () => {
    expect(splitToNonOverlappingRanges1D([1, 4], [3, 6])).toEqual([
      [1, 2],
      [3, 4]
    ]);
    expect(splitToNonOverlappingRanges1D([3, 6], [1, 4])).toEqual([
      [3, 4],
      [5, 6]
    ]);
    expect(splitToNonOverlappingRanges1D([2, 3], [1, 5])).toEqual([[2, 3]]);
    expect(splitToNonOverlappingRanges1D([1, 5], [2, 3])).toEqual([
      [1, 1],
      [2, 3],
      [4, 5]
    ]);
    expect(splitToNonOverlappingRanges1D([1, 5], [1, 3])).toEqual([
      [1, 3],
      [4, 5]
    ]);
    expect(splitToNonOverlappingRanges1D([1, 5], [2, 5])).toEqual([
      [1, 1],
      [2, 5]
    ]);
    expect(splitToNonOverlappingRanges1D([1, 5], [1, 5])).toEqual([[1, 5]]);
    expect(splitToNonOverlappingRanges1D([1, 5], [5, 6])).toEqual([
      [1, 4],
      [5, 5]
    ]);
    expect(splitToNonOverlappingRanges1D([1, 5], [-2, 1])).toEqual([
      [1, 1],
      [2, 5]
    ]);
    expect(splitToNonOverlappingRanges1D([1, 2], [3, 2])).toEqual([[1, 2]]);
  });

  it('allCombinations', () => {
    expect(allCombinations([[1, 2]])).toEqual([[1], [2]]);
    expect(
      allCombinations([
        [1, 2],
        [3, 4]
      ])
    ).toEqual([
      [1, 3],
      [1, 4],
      [2, 3],
      [2, 4]
    ]);
  });

  it('split multi dimension', () => {
    const range1 = [
      [1, 4],
      [2, 5]
    ];
    const range2 = [
      [3, 6],
      [4, 6]
    ];
    const result = splitToNonOverLappingMultiDimension(range1, range2);
    expect(result).toEqual([
      [
        [1, 2],
        [2, 3]
      ],
      [
        [1, 2],
        [4, 5]
      ],
      [
        [3, 4],
        [2, 3]
      ],
      [
        [3, 4],
        [4, 5]
      ]
    ]);
  });
});
