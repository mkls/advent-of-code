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

const doesExecute = program => {
  let acc = 0;
  let executionPointer = 0;
  const executed = [];

  while (!executed.includes(executionPointer) && executionPointer < program.length) {
    executed.push(executionPointer);
    const { instr, arg } = program[executionPointer];
    if (instr === 'nop') {
      executionPointer++;
    } else if (instr === 'acc') {
      acc += arg;
      executionPointer++;
    } else {
      executionPointer += arg;
    }
  }
  return { acc, isFixed: executionPointer === program.length };
};

const res = _.range(0, lines.length)
  .map(changeIndex =>
    lines.map((line, i) => {
      if (i !== changeIndex) return line;
      if (line.instr === 'nop') return { ...line, instr: 'jmp' };
      if (line.instr === 'jmp') return { ...line, instr: 'nop' };
      return line;
    })
  )
  .map(doesExecute)
  .find(r => r.isFixed);

console.log(res);
