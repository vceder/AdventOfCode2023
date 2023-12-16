import { sum } from "../utils";

const validateCombination = (combination, structure) =>
  combination
    .split(".")
    .filter((part) => part !== "")
    .map((spring) => spring.length)
    .join(",") === structure;

const getAllCombinations = (input) => {
  const chars = ["#", "."];
  const index = input.indexOf("?");
  // console.log(input);
  if (index === -1) return [input];

  return chars.flatMap((char) =>
    getAllCombinations(input.slice(0, index) + char + input.slice(index + 1))
  );
};

export const getPossibleCombinations = (input, structure, index) => {
  // if (index) console.log(index, input);
  return getAllCombinations(input).filter((combination) =>
    validateCombination(combination, structure)
  );
};

export const partA = (input) =>
  input
    .map((row) => row.split(" "))
    .map(
      ([input, structure]) => getPossibleCombinations(input, structure).length
    )
    .reduce(sum, 0);

const expand = (input, times = 5) => new Array(times).fill(input);

export const partB = (input) =>
  input
    .map((row) => row.split(" "))
    .map(([springs, conditions]) => [
      expand(springs, 2).join("?"),
      expand(conditions, 2).join(","),
    ])
    .map(
      ([input, structure], i) =>
        getPossibleCombinations(input, structure, i).length
    )
    .reduce(sum, 0);
