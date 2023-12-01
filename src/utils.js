export const readFile = (path) =>
  Bun.file(path)
    .text()
    .then((data) => data.split("\n"));

export const isNumber = (char) => "0123456789".includes(char);

export const getFirstAndLast = (values = [], current, index, source) =>
  index === 0 || source.length - 1 === index ? [...values, current] : values;

export const numbers = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};
export const wordsIsNumber = (word) => numbers[word];

const findAllWordsThatAreNumbers = (string) =>
  Object.keys(numbers).reduce((counter, number) => {
    const indexes = [...string.matchAll(new RegExp(number, "gi"))].map(
      (match) => match.index
    );
    if (indexes.length === 0) return counter;
    return { ...counter, [number]: indexes };
  }, {});

export const replaceWordsToNumbers = (string) => {
  let matches = findAllWordsThatAreNumbers(string);
  while (Object.keys(matches).length > 0) {
    const [replaceWith, index] = Object.entries(matches).sort(
      (a, b) => a[1][0] - b[1][0]
    )[0];

    string =
      string.substring(0, index[0]) +
      numbers[replaceWith] +
      string.substring(index[0] + 1);
    matches = findAllWordsThatAreNumbers(string);
  }

  return string;
};

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
