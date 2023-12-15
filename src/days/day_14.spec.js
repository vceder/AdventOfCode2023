import { expect, test } from "bun:test";

import { cycleBoard, partA, partB, rotateBoard, shiftBoard } from "./day_14.js";

const input = [
  "O....#....",
  "O.OO#....#",
  ".....##...",
  "OO.#O....O",
  ".O.....O#.",
  "O.#..O.#.#",
  "..O..#O..O",
  ".......O..",
  "#....###..",
  "#OO..#....",
];

test("should shift board as much north as possible", () => {
  expect(
    shiftBoard(input.map((row) => row.split(""))).map((row) => row.join(""))
  ).toEqual([
    "OOOO.#.O..",
    "OO..#....#",
    "OO..O##..O",
    "O..#.OO...",
    "........#.",
    "..#....#.#",
    "..O..#.O.O",
    "..O.......",
    "#....###..",
    "#....#....",
  ]);
});

test("should cycle board correctly", () => {
  expect(
    cycleBoard([
      [".", ".", "."],
      [".", ".", "."],
      ["O", "O", "O"],
    ])
  ).toEqual([
    [".", ".", "."],
    [".", ".", "."],
    ["O", "O", "O"],
  ]);

  expect(
    cycleBoard(input.map((row) => row.split(""))).map((row) => row.join(""))
  ).toEqual([
    ".....#....",
    "....#...O#",
    "...OO##...",
    ".OO#......",
    ".....OOO#.",
    ".O#...O#.#",
    "....O#....",
    "......OOOO",
    "#...O###..",
    "#..OO#....",
  ]);
});

test("should rotate board", () => {
  expect(
    rotateBoard([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ])
  ).toEqual([
    [7, 4, 1],
    [8, 5, 2],
    [9, 6, 3],
  ]);
});

test("day 14 Part A should return the correct value", () => {
  expect(partA(input)).toEqual(136);
});

test("day 14 Part B should return the correct value", () => {
  expect(partB(input)).toEqual(64);
});
