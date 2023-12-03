import { expect, test } from "bun:test";

import {
  partA,
  partB,
  buildParts,
  buildMatrix,
  checkIfPartIsValid,
  generatePositions,
  partAValidator,
} from "./day_03.js";

const input = [
  "467..114..",
  "...*......",
  "..35..633.",
  "......#...",
  "617*......",
  ".....+.58.",
  "..592.....",
  "......755.",
  "...$.*....",
  ".664.598..",
];

test("day 03 Part A should return the correct value", async () => {
  expect(partA(input)).toEqual(4361);
});

test("day 03 Part B should return the correct value", () => {
  expect(partB(input)).toEqual(467835);
});

test("should build a matrix from an array", () => {
  const matrix = buildMatrix(["467..114..", "...*......", "..35..633."]);
  expect(matrix).toEqual([
    ["4", "6", "7", ".", ".", "1", "1", "4", ".", "."],
    [".", ".", ".", "*", ".", ".", ".", ".", ".", "."],
    [".", ".", "3", "5", ".", ".", "6", "3", "3", "."],
  ]);
});

test("should build a part array from a matrix", () => {
  const matrix = buildMatrix(["467..114..", "...*......", "..35..633."]);
  const parts = buildParts(matrix).map(({ value }) => value);
  expect(parts).toEqual(["467", "114", "35", "633"]);
});

test("should generate array with numbers between start and end", () => {
  expect(generatePositions(5, 10)).toEqual([5, 6, 7, 8, 9]);
});

test("should say if a part is valid in a given matrix", () => {
  const matrix = buildMatrix(input);
  const parts = buildParts(matrix);

  expect(!!checkIfPartIsValid(parts[0], matrix, partAValidator)).toBeTrue();
  expect(
    parts
      .filter((part) => !checkIfPartIsValid(part, matrix, partAValidator))
      .map(({ value }) => value)
  ).toEqual(["114", "58"]);
});
