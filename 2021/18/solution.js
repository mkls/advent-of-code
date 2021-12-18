'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars

exports.getPaths = vs => {
  if (!_.isArray(vs)) return [{ path: [], isLeaf: true }];
  return [
    { path: [], isLeaf: false },
    ...vs.flatMap((v, i) => this.getPaths(v).map(r => ({ ...r, path: [i, ...r.path] })))
  ];
};

exports.explode = v => {
  const paths = this.getPaths(v);

  const pathToExplode = paths.find(p => p.path.length === 4 && !p.isLeaf);
  if (!pathToExplode) return { changed: false };

  const toExplode = _.get(v, pathToExplode.path);
  v = _.cloneDeep(v);

  const indexOfToExplodePath = paths.indexOf(pathToExplode);
  const pathsToLeft = paths.slice(0, indexOfToExplodePath).reverse();
  addToNextLeaf(v, pathsToLeft, toExplode[0]);
  const pathsToRight = paths.slice(indexOfToExplodePath + 3);
  addToNextLeaf(v, pathsToRight, toExplode[1]);

  _.set(v, pathToExplode.path, 0);
  return { changed: true, v };
};

const addToNextLeaf = (v, paths, toAdd) => {
  const nextLeaf = paths.find(p => p.isLeaf);
  if (nextLeaf) _.set(v, nextLeaf.path, _.get(v, nextLeaf.path) + toAdd);
};

exports.split = v => {
  const asJson = JSON.stringify(v);
  const numbers = asJson.split(/[^0-9]+/).map(Number);
  const toSplit = numbers.find(n => n >= 10);
  if (!toSplit) return { changed: false };

  const newValue = [Math.floor(toSplit / 2), Math.ceil(toSplit / 2)];
  const newJson = asJson.replace(`${toSplit}`, JSON.stringify(newValue));
  return { changed: true, v: JSON.parse(newJson) };
};

exports.reduce = v =>
  [this.explode, this.split].reduce((accu, func) => {
    const { changed, v } = func(accu);
    if (!changed) return accu;
    return this.reduce(v);
  }, v);

exports.magnitude = v => {
  if (!Array.isArray(v)) return v;
  return 3 * this.magnitude(v[0]) + 2 * this.magnitude(v[1]);
};

exports.part1 = vs => {
  const added = vs.reduce((accu, v) => this.reduce([accu, v]));
  return this.magnitude(added);
};

exports.part2 = vs => {
  const pairs = vs.flatMap(a => vs.map(b => [a, b])).filter(p => p[0] !== p[1]);
  const magnitudes = pairs.map(p => this.magnitude(this.reduce(p)));
  return Math.max(...magnitudes);
};
