'use strict';

const { multiply } = require('mathjs');

const permutations = [
  [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
  ],
  [
    [0, 1, 0],
    [0, 0, 1],
    [1, 0, 0]
  ],
  [
    [0, 0, 1],
    [1, 0, 0],
    [0, 1, 0]
  ]
];
const negations = [
  [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
  ],
  [
    [-1, 0, 0],
    [0, -1, 0],
    [0, 0, 1]
  ],
  [
    [-1, 0, 0],
    [0, 1, 0],
    [0, 0, -1]
  ],
  [
    [1, 0, 0],
    [0, -1, 0],
    [0, 0, -1]
  ]
];
const positiveOrNegative = [
  [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
  ],
  [
    [0, 0, -1],
    [0, -1, 0],
    [-1, 0, 0]
  ]
];

module.exports = permutations.flatMap(a =>
  negations.flatMap(b => positiveOrNegative.map(c => multiply(a, b, c)))
);
