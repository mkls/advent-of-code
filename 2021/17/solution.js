'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars

// const target = { x: [20, 30], y: [-10, -5] };
const target = { x: [257, 286], y: [-101, -57] }; // actual

const isInRange = (v, target) => v >= target[0] && v <= target[1];

const doesVxHitTarget = (x, vx) => {
  if (isInRange(x, target.x)) return true;
  if (x > target.x[1] || vx === 0) return false;
  return doesVxHitTarget(x + vx, vx - 1);
};

const vxRange = _.range(0, 300).filter(vx => doesVxHitTarget(0, vx));
console.log({ vxRange });

const doesVyHitTarget = (y, vy) => {
  let cy = y;
  let cvy = vy;
  do {
    cy = cy + cvy;
    cvy = cvy - 1;
    if (isInRange(cy, target.y)) {
      return true;
    }
  } while (!(cvy < 0 && cy < target.y[0]));
  return false;
};

const vyRange = _.range(-110, 1000).filter(vy => doesVyHitTarget(0, vy));

console.log({ vyRange });

const nextState = ({ loc, speed }) => {
  const [x, y] = loc;
  const [vx, vy] = speed;

  return {
    loc: [x + vx, y + vy],
    speed: [vx > 0 ? vx - 1 : vx < 0 ? vx + 1 : 0, vy - 1]
  };
};

const getPath = ({ loc, speed }) => {
  if (loc[0] > target.x[1] || loc[1] < target.y[0]) {
    return [];
  }
  return [loc, ...getPath(nextState({ loc, speed }))];
};

const isPathInTarget = path =>
  path.some(([x, y]) => isInRange(x, target.x) && isInRange(y, target.y));

console.log(getPath({ loc: [0, 0], speed: [286, -101] }));

const speedsToCheck = vxRange.flatMap(x => vyRange.map(y => [x, y]));
console.log('speedsToCheck length', speedsToCheck.length);

const paths = speedsToCheck.filter(speed => isPathInTarget(getPath({ loc: [0, 0], speed })));

console.log('paths count', paths.length);

