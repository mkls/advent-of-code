'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars

const numbers = require('fs')
  .readFileSync(__dirname + '/actual.txt', 'utf-8')
  .split('\n')
  .map(JSON.parse);

const findExplodePoint = root => {
  let nodesToVisit = [{ value: root, path: [] }];
  let explodePoint = null;
  let previousNumberPath = null;
  let nextNumberPath = null;

  while (nodesToVisit.length > 0) {
    const { value, path } = nodesToVisit.shift();

    const isNumber = typeof value === 'number';

    if (!isNumber) {
      const childNodes = value.map((v, i) => ({ value: v, path: [...path, i] }));
      nodesToVisit = [...childNodes, ...nodesToVisit];
    }

    if (isNumber && !explodePoint) previousNumberPath = path;
    const isInsideexplodePoint =
      explodePoint && _.isEqual(path.slice(0, explodePoint.length), explodePoint);
    if (isNumber && explodePoint && !nextNumberPath && !isInsideexplodePoint) nextNumberPath = path;
    if (!isNumber && path.length === 4 && !explodePoint) explodePoint = path;
  }
  return { explodePoint, previousNumberPath, nextNumberPath };
};

const explode = v => {
  const { explodePoint, previousNumberPath, nextNumberPath } = findExplodePoint(v);
  if (!explodePoint) return { changed: false };

  const exploding = _.get(v, explodePoint);
  if (previousNumberPath) {
    _.set(v, previousNumberPath, _.get(v, previousNumberPath) + exploding[0]);
  }
  if (nextNumberPath) {
    _.set(v, nextNumberPath, _.get(v, nextNumberPath) + exploding[1]);
  }
  _.set(v, explodePoint, 0);
  return { changed: true, v };
};

const split = v => {
  const asJson = JSON.stringify(v);
  const numbers = asJson.split(/[^0-9]+/).map(Number);
  const toSplit = numbers.find(n => n >= 10);
  if (!toSplit) return { changed: false };

  const newValue = [Math.floor(toSplit / 2), Math.ceil(toSplit / 2)];
  const newJson = asJson.replace(`${toSplit}`, JSON.stringify(newValue));
  return {
    changed: true,
    v: JSON.parse(newJson)
  };
};

const reduce = v =>
  [explode, split].reduce((accu, func) => {
    const { changed, v } = func(accu);
    if (!changed) return accu;
    return reduce(v);
  }, v);

const add = (a, b) => reduce([a, b]);

const addAll = vs => vs.reduce(add);

const magnitude = v => {
  if (!Array.isArray(v)) return v;
  return 3 * magnitude(v[0]) + 2 * magnitude(v[1]);
};

const numbersForPartOne = numbers.map(_.cloneDeep);
console.log('result 1', magnitude(addAll(numbersForPartOne)));

const pairsToAdd = numbers.flatMap(a => numbers.map(b => [a, b])).filter(p => p[0] !== p[1]);
const magnitudes = pairsToAdd.map(p => magnitude(reduce(_.cloneDeep(p))));

console.log('result 2', Math.max(...magnitudes));
