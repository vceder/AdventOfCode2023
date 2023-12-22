import { expect, test } from "bun:test";

import {
  countAndMarkGalaxies,
  expandSpace,
  generatePairs,
  getDistanceBetweenGalaxies,
  getDistanceBetweenExpandingGalaxies,
  partA,
  partB,
} from "./day_11.js";

const input = [
  "...#......",
  ".......#..",
  "#.........",
  "..........",
  "......#...",
  ".#........",
  ".........#",
  "..........",
  ".......#..",
  "#...#.....",
];

test("day 11 Part A should return the correct value", () => {
  expect(partA(input)).toEqual(374);
});

test("should expand rows and columns existing only of .", () => {
  const start = input.map((row) => row.split(""));
  expect(expandSpace(start)).toEqual(
    [
      "....#........",
      ".........#...",
      "#............",
      ".............",
      ".............",
      "........#....",
      ".#...........",
      "............#",
      ".............",
      ".............",
      ".........#...",
      "#....#.......",
    ].map((row) => row.split(""))
  );
});

test("should count and mark all the galaxies on the star map", () => {
  const starMap = expandSpace(input.map((row) => row.split("")));
  const galaxies = countAndMarkGalaxies(starMap);
  expect(starMap).toEqual(
    [
      "....1........",
      ".........2...",
      "3............",
      ".............",
      ".............",
      "........4....",
      ".5...........",
      "............6",
      ".............",
      ".............",
      ".........7...",
      "8....9.......",
    ].map((row) => row.split(""))
  );
  expect(galaxies).toBeArrayOfSize(9);
});

test("should calculate the correct distance between a galaxy pair", () => {
  const one = { row: 0, column: 4, number: 1 };
  const three = { row: 2, column: 0, number: 3 };
  const five = { row: 6, column: 1, number: 5 };
  const six = { row: 7, column: 12, number: 6 };
  const seven = { row: 10, column: 9, number: 7 };
  const eight = { row: 11, column: 0, number: 8 };
  const nine = { row: 11, column: 5, number: 9 };

  expect(getDistanceBetweenGalaxies(one, seven)).toEqual(15);
  expect(getDistanceBetweenGalaxies(three, six)).toEqual(17);
  expect(getDistanceBetweenGalaxies(five, nine)).toEqual(9);
  expect(getDistanceBetweenGalaxies(eight, nine)).toEqual(5);
});

test("should calculate the correct distance between expanding galaxy pairs", () => {
  const one = { row: 0, column: 3, number: 1 };
  const three = { row: 2, column: 0, number: 3 };
  const five = { row: 5, column: 1, number: 5 };
  const six = { row: 6, column: 9, number: 6 };
  const seven = { row: 8, column: 7, number: 7 };
  const eight = { row: 9, column: 0, number: 8 };
  const nine = { row: 9, column: 4, number: 9 };
  expect(
    getDistanceBetweenExpandingGalaxies(one, seven, [2, 5, 8], [3, 7], 2)
  ).toEqual(15);
  expect(
    getDistanceBetweenExpandingGalaxies(three, six, [2, 5, 8], [3, 7], 2)
  ).toEqual(17);
  expect(
    getDistanceBetweenExpandingGalaxies(five, nine, [2, 5, 8], [3, 7], 2)
  ).toEqual(9);
  expect(
    getDistanceBetweenExpandingGalaxies(eight, nine, [2, 5, 8], [3, 7], 2)
  ).toEqual(5);
});

test("should generate the correct pairs", () => {
  const starMap = expandSpace(input.map((row) => row.split("")));
  const galaxies = countAndMarkGalaxies(starMap);
  expect(generatePairs(galaxies).length).toEqual(36);
});

test("day 11 Part B should return the correct value", () => {
  expect(partB(input, 10)).toEqual(1030);
  expect(partB(input, 100)).toEqual(8410);
});
