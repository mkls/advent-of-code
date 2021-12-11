'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars

let grid = require('fs')
  .readFileSync(__dirname + '/actual.txt', 'utf-8')
  .split('\n')
  .map(line => line.split('').map(Number));


const printGrid = () =>
  console.log('\n grid \n' + grid.map(line => line.map(v => ('' + v).padStart(2)).join(',')).join('\n'));

let result;

for (let round = 1; result === undefined; round++) {
  grid = grid.map(row => row.map(v => v + 1));

  const flashed = {};

  let flashing;
  do {
    flashing = grid
      .flatMap((rowItems, row) => rowItems.map((v, col) => ({ row, col, v })))
      .filter(({ row, col, v }) => v > 9 && !flashed[`${row},${col}`]);

    flashing.forEach(({ row, col }) => (flashed[`${row},${col}`] = true));

    const neighBours = flashing.flatMap(({ row, col }) =>
      _.range(row - 1, row + 2)
        .flatMap(r => _.range(col - 1, col + 2).map(c => ({ row: r, col: c })))
        .filter(
          n =>
            n.row > -1 && n.row < 10 && n.col > -1 && n.col < 10 && !(n.col === col && n.row === row)
        )
    );
    neighBours.forEach(({ row, col }) => {
      grid[row][col] += 1;
    });
  } while (flashing.length > 0);

  Object.keys(flashed).forEach(key => {
    const [row, col] = key.split(',').map(Number);
    grid[row][col] = 0;
  });

  printGrid();
  if (Object.keys(flashed).length === 100) {
    result = round;
  }
}

console.log(result);
