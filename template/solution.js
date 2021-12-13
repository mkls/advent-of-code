'use strict';

const _ = require('lodash'); // eslint-disable-line no-unused-vars
const common = require('../../common'); // eslint-disable-line no-unused-vars

const lines = require('fs')
  .readFileSync(__dirname + '/example.txt', 'utf-8')
  .split('\n');

console.log(lines);
