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
  const letterCount = line.password.split('').filter(c => c === line.letter).length;
  return letterCount >= line.policy[0] && letterCount <= line.policy[1];
};

const result = lines.filter(isValid).length
console.log(result);