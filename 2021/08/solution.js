'use strict';


const _ = require('lodash'); // eslint-disable-line no-unused-vars

const sortChars = cs => cs.split('').sort().join('');

const lines = require('fs')
  .readFileSync(__dirname + '/actual.txt', 'utf-8')
  .split('\n')
  .map(l => {
    const [input, out] = l.split(' | ');
    return { in: input.split(' ').map(sortChars), out: out.split(' ').map(sortChars) };
  });

const getDiff = (a, b) => {
  const chars = [...a.split(''), ...b.split('')];
  return chars.filter(c => !a.includes(c) || !b.includes(c));
};

const getCommon = (a, b) => {
  const chars = [...a.split(''), ...b.split('')];
  return _.uniq(chars.filter(c => a.includes(c) && b.includes(c)));
}

const getOnlyInLeft = (a, b) => {
  return a.split('').filter(c => !b.includes(c));
}

const timesInRights = (c, rs, times) => {
  const containCount = rs.filter(r => r.includes(c)).length;
  return containCount === times;
}

const getByLength = (ins, length) => ins.filter(i => i.length === length);


const getTranslation = ins => {
  const one = getByLength(ins, 2)[0];
  const seven = getByLength(ins, 3)[0];
  const four = getByLength(ins, 4)[0];

  const a = getDiff(one, seven)[0];
  const cOrF = getCommon(one, seven);
  const bOrD = getOnlyInLeft(four, seven);

  const fiveLong = getByLength(ins, 5);

  const b = bOrD.find(c => timesInRights(c, fiveLong, 1));
  const d = bOrD.find(c => c !== b);

  const five = fiveLong.find(input => [a, b, d].every(c => input.includes(c)));

  const f = cOrF.find(c => five.includes(c));
  const c = cOrF.find(c => c !== f);

  const two = fiveLong.find(cs => !cs.includes(f));
  const three = fiveLong.find(cs => cs !== two && cs !== five);

  const e = getOnlyInLeft(two, three)[0];
  const g = two.split('').find(char => ![a, c, d, e].includes(char));
  return _.invert({
    0: sortChars(a + b + c + e + f + g),
    1: sortChars(one),
    2: sortChars(two),
    3: sortChars(three),
    4: sortChars(four),
    5: sortChars(five),
    6: sortChars(a + b + d + e + f + g),
    7: sortChars(seven),
    8: sortChars(a + b + c + d + e + f + g),
    9: sortChars(a + b + c + d + f + g)
  })
};

const result = lines.map(line => {
  const translation = getTranslation(line.in);
  return Number(line.out.map(input => translation[input]).join(''));
})

console.log(result);
console.log(_.sum(result));

