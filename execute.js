'use strict';

console.log('\n\n ------------------------------ Script start ------------------------------ \n\n');

const args = process.argv.slice(2);

const day = args[0];
const year = args[1] || 2021;

require(`./${year}/${day}/solution.js`);
