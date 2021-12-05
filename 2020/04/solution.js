'use strict';

const lines = require('fs')
  .readFileSync(__dirname + '/actual.txt', 'utf-8')
  .replace(/\n\n/g, '#-#')
  .replace(/\n/g, ' ')
  .split('#-#')
  .map(line =>
    line.split(' ').map(field => ({ name: field.split(':')[0], value: field.split(':')[1] }))
  );

const requiredFields = [
  { name: 'byr', valid: v => v.length === 4 && v >= 1920 && v <= 2002 },
  { name: 'iyr', valid: v => v.length === 4 && v >= 2010 && v <= 2020 },
  { name: 'eyr', valid: v => v.length === 4 && v >= 2020 && v <= 2030 },
  {
    name: 'hgt',
    valid: v => {
      const d = +v.slice(0, -2);
      if (v.endsWith('cm')) {
        return d >= 150 && d <= 193;
      } else if (v.endsWith('in')) {
        return d >= 59 && d <= 76;
      } else {
        return false;
      }
    }
  },
  { name: 'hcl', valid: v => /^#[a-f0-9]{6}$/.test(v) },
  { name: 'ecl', valid: v => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(v) },
  { name: 'pid', valid: v => /^[0-9]{9}$/.test(v) }
];

const isValid = pass =>
  requiredFields.every(field => {
    const matching = pass.find(f => f.name === field.name);
    return !!matching && field.valid(matching.value);
  });

const result = lines.filter(isValid);
console.log(result.length);
