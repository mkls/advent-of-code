'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars

exports.main = input => {
  let [, busIds] = input.split('\n');
  const buses = busIds
    .split(',')
    .map((id, offset) => ({ id: Number(id), offset }))
    .filter(({ id }) => !isNaN(id));
  const remainders = [];
  const dividers = [];
  buses.forEach(({ id, offset }) => {
    dividers.push(BigInt(id));
    remainders.push(BigInt(id - offset));
  });

  return chineseRemainder(remainders, dividers);
};

// functions from https://github.com/pnicorelli/nodejs-chinese-remainder/blob/master/chinese_remainder.js
function chineseRemainder(a, n) {
  var p = BigInt(1);
  var i = 1;
  var prod =  BigInt(1);
  var sm = BigInt(0);
  for (i = 0; i < n.length; i++) {
    prod = prod * n[i];
  }
  for (i = 0; i < n.length; i++) {
    p = prod / n[i];
    sm = sm + a[i] * mul_inv(p, n[i]) * p;
  }
  return sm % prod;
}

function mul_inv(a, b) {
  var b0 = b;
  var x0 = BigInt(0);
  var x1 = BigInt(1);
  var q, tmp;
  if (b == 1) {
    return BigInt(1);
  }
  while (a > 1) {
    q = BigInt(parseInt(a / b));
    tmp = a;
    a = b;
    b = tmp % b;
    tmp = x0;
    x0 = x1 - q * x0;
    x1 = tmp;
  }
  if (x1 < 0) {
    x1 = x1 + b0;
  }
  return x1;
}
