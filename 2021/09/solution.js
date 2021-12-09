'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars

const rows = require('fs')
  .readFileSync(__dirname + '/actual.txt', 'utf-8')
  .split('\n')
  .map(l => l.split('').map(Number));

const lows = [];
for (let row = 0; row < rows.length; row++) {
  const thisRow = rows[row];
  const topEdge = row === 0;
  const botEdge = row === rows.length - 1;
  for (let col = 0; col < thisRow.length; col++) {
    const leftEdge = col === 0;
    const rightEdge = col === thisRow.length - 1;

    const v = thisRow[col];
    const top = topEdge ? 10 : rows[row - 1][col];
    const bot = botEdge ? 10 : rows[row + 1][col];
    const left = leftEdge ? 10 : thisRow[col - 1];
    const right = rightEdge ? 10 : thisRow[col + 1];

    if (v < top && v < bot && v < left && v < right) {
      lows.push({ row, col });
    }
  }
}

const isBasinEdge = ({ col, row }) => {
  const topEdge = row < 0;
  const botEdge = row > rows.length - 1;
  const leftEdge = col < 0;
  const rightEdge = col > rows[0].length - 1;
  return topEdge || botEdge || leftEdge || rightEdge || rows[row][col] === 9;
};

const getBasin = loc => {
  let knowns = {};
  const addToBasin = loc => {
    knowns[JSON.stringify(loc)] = true;
  };
  const isKnown = loc => knowns[JSON.stringify(loc)];

  const checkNeighBours = loc => {
    const { col, row } = loc;
    const top = { row: row - 1, col };
    const bot = { row: row + 1, col };
    const left = { row, col: col - 1 };
    const right = { row, col: col + 1 };

    [top, bot, left, right].forEach(loc => {
      if (!isBasinEdge(loc) && !isKnown(loc)) {
        addToBasin(loc);
        checkNeighBours(loc);
      }
    });
  };

  addToBasin(loc);
  checkNeighBours(loc);
  return Object.keys(knowns).length;
};

const basins = lows.map(getBasin).sort((a, b) => b - a);

console.log(basins.slice(0, 3).reduce((a, b) => a * b));
