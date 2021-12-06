'use strict';

const _ = require('lodash');

const lines = require('fs')
  .readFileSync(__dirname + '/example.txt', 'utf-8')
  .split('\n');

console.log(lines);
