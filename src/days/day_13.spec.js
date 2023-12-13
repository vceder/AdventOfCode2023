import { expect, test } from "bun:test";

import {
  findColumnMirror,
  findRowMirror,
  generatePossibleCleanMirrors,
  partA,
  partB,
} from "./day_13.js";

const input = [
  "#.##..##.",
  "..#.##.#.",
  "##......#",
  "##......#",
  "..#.##.#.",
  "..##..##.",
  "#.#.##.#.",
  "",
  "#...##..#",
  "#....#..#",
  "..##..###",
  "#####.##.",
  "#####.##.",
  "..##..###",
  "#....#..#",
];

test("should find mirror horizontally", () => {
  expect(
    findRowMirror([
      "#...##..#",
      "#....#..#",
      "..##..###",
      "#####.##.",
      "#####.##.",
      "..##..###",
      "#....#..#",
    ])
  ).toEqual(4);
});

test("should find mirror vertically", () => {
  expect(
    findColumnMirror([
      "#.##..##.",
      "..#.##.#.",
      "##......#",
      "##......#",
      "..#.##.#.",
      "..##..##.",
      "#.#.##.#.",
    ])
  ).toEqual(5);
  expect(
    findColumnMirror(
      [
        "...#....#",
        "###.####.",
        "###......",
        "##.......",
        "..#######",
        "##...##..",
        "...#....#",
      ],
      1
    )
  ).toEqual(6);
});

test("day 13 Part A should return the correct value", () => {
  expect(partA(input)).toEqual(405);
});

test("day 13 Part B should return the correct value", () => {
  expect(generatePossibleCleanMirrors(".#\n#.")).toEqual([
    "##\n#.",
    "..\n#.",
    ".#\n..",
    ".#\n##",
  ]);
  expect(
    generatePossibleCleanMirrors(
      "...#....#\n###.####.\n###.#....\n##.......\n..#######\n##...##..\n...#....#\n"
    )
  ).toContain(
    "...#....#\n###.####.\n###......\n##.......\n..#######\n##...##..\n...#....#\n"
  );
  expect(partB(input)).toEqual(400);
});
// ...#....#
// ###.####.
// ###.#....
// ##.......
// ..#######
// ##...##..
// ...#....#
