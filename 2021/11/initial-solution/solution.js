'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars

let grid = require('fs')
  .readFileSync(__dirname + '/actual.txt', 'utf-8')
  .split('\n')
  .map(row => row.split('').map(Number));

const getNeigbours = ({ row, col }) =>
  _.range(row - 1, row + 2)
    .flatMap(nRow => _.range(col - 1, col + 2).map(nCol => ({ row: nRow, col: nCol })))
    .filter(
      item =>
        item.row >= 0 &&
        item.row < 10 &&
        item.col >= 0 &&
        item.col < 10 &&
        !(row === item.row && col === item.col)
    );

let result;
for (let round = 1; result === undefined; round++) {
  grid = grid.map(r => r.map(d => d + 1));

  const hasFlashed = {};

  const getFlashings = () => {
    const flatGrid = grid.flatMap((rowItems, row) => rowItems.map((v, col) => ({ row, col, v })));
    return flatGrid.filter(({ row, col, v }) => !hasFlashed[`${row},${col}`] && v > 9);
  };

  const doTheFlash = flashing => {
    const neighBours = flashing.flatMap(({ row, col }) => {
      hasFlashed[`${row},${col}`] = true;
      grid[row][col] = 0;
      return getNeigbours({ row, col });
    });
    neighBours.forEach(({ row, col }) => grid[row][col]++);
  };

  let flashing;
  do {
    flashing = getFlashings();
    doTheFlash(flashing);
  } while (flashing.length > 0);

  Object.keys(hasFlashed).forEach(key => {
    const [y, x] = key.split(',').map(Number);
    grid[y][x] = 0;
  });

  if (Object.keys(hasFlashed).length === 100) {
    result = round;
  }
}

console.log(result);
