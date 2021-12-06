'use strict';

const { groupBy, mapValues, toPairs, sumBy, map } = require('lodash');

let fishes = require('fs')
  .readFileSync(__dirname + '/actual.txt', 'utf-8')
  .split(',')
  .map(Number);

let counts = toPairs(
  mapValues(
    groupBy(fishes, a => a),
    value => value.length
  )
).map(([days, count]) => ({ day: +days, count }));


for (let i = 1; i <= 256; i++) {
  const newCounts = counts.flatMap(({ day, count }) => {
    if (day === 0) {
      return [
        { day: 6, count },
        { day: 8, count }
      ];
    }
    return [{ day: day - 1, count }];
  });
  const grouped = mapValues(groupBy(newCounts, 'day'), v => ({
    day: v[0].day,
    count: sumBy(v, 'count')
  }));
  counts = map(grouped, a => a);
}

console.log(sumBy(counts, 'count'));
