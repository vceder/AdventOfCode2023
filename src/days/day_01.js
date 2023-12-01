import { getFirstAndLast, isNumber, replaceWordsToNumbers } from "../utils";

export const makePairs = (line) =>
  line
    .split("")
    .filter(isNumber)
    .reduce(getFirstAndLast, [])
    .reduce((formatted, value, _, array) => {
      return array.length === 1 ? [value, value] : [...formatted, value];
    }, [])
    .join("");

const sum = (sum, value) => (sum += Number(value));
export const partA = (input) => input.map(makePairs).reduce(sum, 0);

export const partB = (input) =>
  input.map(replaceWordsToNumbers).map(makePairs).reduce(sum, 0);
