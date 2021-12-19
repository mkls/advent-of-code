'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars
const { multiply } = require('mathjs');
const rotationMatrixes = require('./rotation-matrixes');

const input = require('fs')
  .readFileSync(__dirname + '/example.txt', 'utf-8')
  .split('\n\n')
  .map(s =>
    s
      .split('\n')
      .slice(1)
      .map(c => c.split(',').map(Number))
  );

const findOffset = (ps1, ps2) => {
  return rotationMatrixes
    .map(rotation => {
      const rotated2 = multiply(ps2, rotation);
      const diffs = ps1.flatMap(a => rotated2.map(b => minus(a, b)));
      const atLeast12MatchingOffset = _.find(_.groupBy(diffs, JSON.stringify), v => v.length >= 12);
      return atLeast12MatchingOffset ? { vector: atLeast12MatchingOffset[0], rotation } : null;
    })
    .find(m => m !== null);
};

const normalizeScanners = scanners => {
  const scannerLocations = [];
  const placedScanners = [scanners[0]];
  let unPlacedScanners = scanners.slice(1);

  while (unPlacedScanners.length > 0) {
    const placeableScanners = unPlacedScanners.flatMap(unplacedMeasurements =>
      placedScanners
        .map(placedMeasurements => findOffset(placedMeasurements, unplacedMeasurements))
        .filter(o => o !== undefined)
        .map(offset => ({ measuerments: unplacedMeasurements, offset }))
    );

    scannerLocations.push(...placeableScanners.map(s => s.offset.vector));
    const normalizedScanners = placeableScanners.map(({ offset, measuerments }) =>
      measuerments.map(point => add(multiply(point, offset.rotation), offset.vector))
    );
    placedScanners.push(...normalizedScanners);

    const justPlacedScanners = placeableScanners.map(d => d.measuerments);
    unPlacedScanners = unPlacedScanners.filter(s => !justPlacedScanners.includes(s));
  }

  return { scanners: placedScanners, offsets: scannerLocations };
};

const minus = (p1, p2) => p1.map((v, i) => v - p2[i]);
const add = (p1, p2) => p1.map((v, i) => v + p2[i]);

const result = normalizeScanners(input);

const beacons = _.uniq(result.scanners.flat().map(p => p.join(',')));
console.log('result 1', beacons.length);

const distances = result.offsets
  .flatMap(a => result.offsets.map(b => [a, b]))
  .map(([a, b]) => [0, 1, 2].map(i => Math.abs(a[i] - b[i])))
  .map(_.sum);

console.log('result 2', Math.max(...distances));
