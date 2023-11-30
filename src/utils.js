export const readFile = (path) =>
  Bun.file(path)
    .text()
    .then((data) => data.split("\n"));

export const scaffoldDay = (
  day,
  basePath = "src/days/day_",
  dataPath = "src/data/day_"
) => {
  const formattedDay = day < 10 ? `0${day}` : String(day);
  const testScaffold = `import { expect, test } from 'bun:test';

import { partA, partB } from './day_${formattedDay}.js';

const input = "";

test('day ${formattedDay} Part A should return the correct value', () => {
  expect(partA(input)).toEqual("")
});  

test('day ${formattedDay} Part B should return the correct value', () => {
  expect(partB(input)).toEqual("")
});
  `;
  const codeScaffold = `export const partA = (input) => {};

export const partB = (input) => {};
  `;

  const testFile = Bun.file(`${basePath + formattedDay}.spec.js`);
  const codeFile = Bun.file(`${basePath + formattedDay}.js`);
  const dataFile = Bun.file(`${dataPath + formattedDay}.txt`);

  Bun.write(testFile, testScaffold);
  Bun.write(codeFile, codeScaffold);
  Bun.write(dataFile, "");
};
