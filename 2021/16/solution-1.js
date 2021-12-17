'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars
const common = require('../../common'); // eslint-disable-line no-unused-vars

const actualInput = require('fs').readFileSync(__dirname + '/actual.txt', 'utf-8');

const toBinaryMap = {
  0: '0000',
  1: '0001',
  2: '0010',
  3: '0011',
  4: '0100',
  5: '0101',
  6: '0110',
  7: '0111',
  8: '1000',
  9: '1001',
  A: '1010',
  B: '1011',
  C: '1100',
  D: '1101',
  E: '1110',
  F: '1111'
};

const hexaToBinary = hexa =>
  hexa
    .split('')
    .map(c => toBinaryMap[c])
    .join('')
    .split('')
    .map(Number);

const binaryToInt = bits => _.sum(bits.slice().reverse().map((b, i) => b * 2 ** i));

const parseLiteral = bits => {
  if (bits[0] === 0) return bits.slice(1, 5);
  return [...bits.slice(1, 5), ...parseLiteral(bits.slice(5))];
};

const parseFullLength = bits => {
  let lengthParsed = 0;
  const res = [];
  do {
    const item = parse(bits.slice(lengthParsed));
    lengthParsed += item.length;
    res.push(item);
  } while (lengthParsed < bits.length - 1);
  return res;
};

const parseNumberOfPackets = (bits, n) => {
  const res = [];
  let offset = 0;
  do {
    const item = parse(bits.slice(offset));
    offset += item.length;
    res.push(item);
  } while (res.length !== n);
  return res;
};

const parse = bits => {
  const version = binaryToInt(bits.slice(0, 3));
  const typeId = binaryToInt(bits.slice(3, 6));

  if (typeId == 4) {
    const literal = parseLiteral(bits.slice(6));
    const length = 6 + literal.length + literal.length / 4;
    const value = binaryToInt(literal);
    return { version, typeId, length, value };
  }

  if (bits[6] === 0) {
    const contentLength = binaryToInt(bits.slice(7, 7 + 15));
    const length = 7 + 15 + contentLength;
    const contentBits = bits.slice(7 + 15, length);
    const content = parseFullLength(contentBits);
    return { version, typeId, length, content };
  }

  if (bits[6] === 1) {
    const numberOfPackets = binaryToInt(bits.slice(7, 7 + 11));
    const content = parseNumberOfPackets(bits.slice(7 + 11), numberOfPackets);
    const length = 7 + 11 + _.sumBy(content, 'length');
    return { version, typeId, length, content };
  }
};

const versionSum = parsed => {
  if (parsed.content) {
    return parsed.version + _.sum(parsed.content.map(versionSum));
  } else {
    return parsed.version;
  }
};

const result1 = versionSum(parse(hexaToBinary(actualInput)));
console.log(result1);
