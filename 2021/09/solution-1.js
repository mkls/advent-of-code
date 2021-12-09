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
      lows.push(v);
    }
  }
}

console.log(_.sum(lows.map(l => l + 1)));
