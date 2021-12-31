'use strict';

const fs = require('fs');

console.log('\n\n ------------------------------ Script start ------------------------------ \n');

const [year, day, useExampleFlag] = process.argv.slice(2);
const basePath = `./20${year}/${day}`;

const solver = require(`${basePath}/solution.js`);

if (solver.solve) {
  solver.solve();
}

if (typeof solver.main === 'function') {
  const inputFile = ['e', 'example'].includes(useExampleFlag) ? 'example.txt' : 'actual.txt';
  const inputFilePath = `${basePath}/${inputFile}`;
  const inputExists = fs.existsSync(inputFilePath);
  const input = inputExists ? fs.readFileSync(inputFilePath, 'utf-8') : null;

  const start = Date.now();
  const result = solver.main(input);
  const inputToPrint = inputExists ? inputFile : 'hardcoded input';
  console.log(`\nresult for ${inputToPrint}: (took ${Date.now() - start} ms)`);
  console.log(result);
}
