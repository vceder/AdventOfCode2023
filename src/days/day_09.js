import { sum } from "../utils";

const reduceToDifference = (difference, current, index, source) =>
  index === 0 ? difference : [...difference, current - source[index - 1]];

const getNextValue = (array) => {
  if (array.every((number) => number === 0)) return 0;

  return array.at(-1) + getNextValue(array.reduce(reduceToDifference, []));
};

const getPreviousValue = (array) => {
  if (array.every((number) => number === 0)) return 0;

  return array.at(0) - getPreviousValue(array.reduce(reduceToDifference, []));
};

export const partA = (input) =>
  input
    .map((numbers) => numbers.split(" ").map((number) => Number(number)))
    .map(getNextValue)
    .reduce(sum, 0);

export const partB = (input) =>
  input
    .map((numbers) => numbers.split(" ").map((number) => Number(number)))
    .map(getPreviousValue)
    .reduce(sum, 0);
