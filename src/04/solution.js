'use strict';

const { last, zip } = require('lodash');

const lines = require('fs')
  .readFileSync(__dirname + '/actual.txt', 'utf-8')
  .split('\n');

const draws = lines[0].split(',').map(Number);

const boards = [[]];
for (let i = 2; i < lines.length; i++) {
  if (lines[i] === '') {
    boards.push([]);
    continue;
  }
  const column = lines[i]
    .split(' ')
    .filter(d => d !== '')
    .map(d => ({ value: +d, marked: false }));
  last(boards).push(column);
}

const markDrawOnBoard = (draw, board) => {
  board.forEach(row =>
    row.forEach(item => {
      if (item.value === draw) {
        item.marked = true;
      }
    })
  );
};

const isBoardWinner = board => {
  const hasWinnerRow = board.some(row => row.every(item => item.marked));

  const transposed = zip(...board);
  const hasWinnerColumn = transposed.some(column => column.every(item => item.marked));

  return hasWinnerRow || hasWinnerColumn;
};

const sumOfUnmarked = board => {
  return board.reduce(
    (accu, row) => accu + row.reduce((accu, item) => accu + (item.marked ? 0 : item.value), 0),
    0
  );
};

draws.forEach(draw => {
  boards.forEach(board => markDrawOnBoard(draw, board));

  const winnerBoard = boards.find(isBoardWinner);
  if (winnerBoard) {
    console.log(sumOfUnmarked(winnerBoard));
    console.log(draw);
    console.log(draw * sumOfUnmarked(winnerBoard));
    process.exit();
  }
});
