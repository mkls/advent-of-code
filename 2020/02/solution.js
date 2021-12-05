'use strict';

const lines = require('fs')
  .readFileSync(__dirname + '/actual.txt', 'utf-8')
  .split('\n')
  .map(line => line.split(' '))
  .map(parts => ({
    policy: parts[0].split('-').map(Number),
    letter: parts[1].slice(0, 1),
    password: parts[2]
  }));

const isValid = line => {
  const a = line.password[line.policy[0] - 1] === line.letter;
  const b = line.password[line.policy[1] - 1] === line.letter;

  return a && !b || !a && b;
};

const result = lines.filter(isValid).length
console.log(result);