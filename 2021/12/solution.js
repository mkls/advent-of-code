'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars

const connections = require('fs')
  .readFileSync(__dirname + '/actual.txt', 'utf-8')
  .split('\n')
  .map(line => line.split('-'));

const caves = {};
_.uniq(connections.flat()).forEach(id => {
  caves[id] = { isBig: /[A-Z]/.test(id) };
});

connections.forEach(([s, e]) => {
  caves[s].paths = (caves[s].paths || []).concat(e);
  caves[e].paths = (caves[e].paths || []).concat(s);
});

const getPaths = (id, pathSoFar = []) => {
  if (id === 'end') {
    return [{ isValid: true, pathSoFar }];
  }

  const goals = caves[id].paths.filter(c => {
    if (c === 'start') return false;
    if (caves[c].isBig) return true;

    const hasDuplicate = pathSoFar
      .filter(p => !caves[p].isBig)
      .some((p, i, arr) => i !== arr.indexOf(p));

    return hasDuplicate ? !pathSoFar.includes(c): true;
  });
  if (goals.length === 0) {
    return [{ isValid: false }];
  }
  return goals.flatMap(g => getPaths(g, [...pathSoFar, g])).filter(r => r.isValid);
};

const res = getPaths('start', ['start']).map(r => r.pathSoFar);
console.log(res);
console.log(res.length);
