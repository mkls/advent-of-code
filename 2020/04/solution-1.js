'use strict';

const lines = require('fs')
  .readFileSync(__dirname + '/actual.txt', 'utf-8')
  .replace(/\n\n/g, '#-#')
  .replace(/\n/g, ' ')
  .split('#-#')
  .map(line => line.split(' ').map(field => field.split(':')[0]));

const requiredField = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

const isValid = pass => requiredField.every(field => pass.includes(field));

console.log(lines.filter(isValid).length);

