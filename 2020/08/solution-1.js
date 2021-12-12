'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars

const lines = require('fs')
  .readFileSync(__dirname + '/actual.txt', 'utf-8')
  .split('\n')
  .map(line => {
    let [instr, arg] = line.split(' ');
    arg = parseInt(arg);
    return { instr, arg };
  });


let acc = 0;
let executionPointer = 0;
const executed = [];

while (!executed.includes(executionPointer)) {
  executed.push(executionPointer);
  const { instr, arg } = lines[executionPointer];
  if (instr === 'nop') {
    executionPointer++;
  } else if (instr === 'acc') {
    acc += arg;
    executionPointer++;
  } else {
    executionPointer += arg;
  }
}
console.log(acc);
