import { expect, test } from "bun:test";

import { getPossibleCombinations, partA, partB } from "./day_12.js";

const inputs = [
  { input: "???.###", structure: "1,1,3", answer: 1 },
  { input: ".??..??...?##.", structure: "1,1,3", answer: 4 },
  { input: "?#?#?#?#?#?#?#?", structure: "1,3,1,6", answer: 1 },
  { input: "????.#...#...", structure: "4,1,1", answer: 1 },
  { input: "????.######..#####.", structure: "1,6,5", answer: 4 },
  { input: "?###????????", structure: "3,2,1", answer: 10 },
];

test("should get the right combinations", () => {
  expect(getPossibleCombinations("???.###", "1,1,3")).toEqual(["#.#.###"]);
  expect(getPossibleCombinations("?###????????", "3,2,1")).toEqual([
    ".###.##.#...",
    ".###.##..#..",
    ".###.##...#.",
    ".###.##....#",
    ".###..##.#..",
    ".###..##..#.",
    ".###..##...#",
    ".###...##.#.",
    ".###...##..#",
    ".###....##.#",
  ]);
});

test("should get the right amount of combinations", () => {
  expect(getPossibleCombinations("???.###", "1,1,3").length).toEqual(1);
  expect(getPossibleCombinations(".??..??...?##.", "1,1,3").length).toEqual(4);
  expect(getPossibleCombinations("?#?#?#?#?#?#?#?", "1,3,1,6").length).toEqual(
    1
  );
  expect(getPossibleCombinations("????.#...#...", "4,1,1").length).toEqual(1);
  expect(
    getPossibleCombinations("????.######..#####.", "1,6,5").length
  ).toEqual(4);
  expect(getPossibleCombinations("?###????????", "3,2,1").length).toEqual(10);
});

test("day 12 Part A should return the correct value", () => {
  expect(
    partA(inputs.map(({ input, structure }) => `${input} ${structure}`))
  ).toEqual(21);
});

// test("day 12 Part B should return the correct value", () => {
//   expect(
//     partB(inputs.map(({ input, structure }) => `${input} ${structure}`))
//   ).toEqual(525152);
// });
