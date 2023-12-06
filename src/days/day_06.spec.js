import { expect, test } from "bun:test";

import { partA, partB, getWinningStrategies } from "./day_06.js";

const input = ["Time:      7  15   30", "Distance:  9  40  200"];

test("should find the correct amount of winning strategies", () => {
  expect(getWinningStrategies({ time: 7, distance: 9 })).toEqual([2, 3, 4, 5]);
});

test("day 06 Part A should return the correct value", () => {
  expect(partA(input)).toEqual(288);
});

test("day 06 Part B should return the correct value", () => {
  expect(partB(input)).toEqual(71503);
});
