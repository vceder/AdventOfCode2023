import { expect, test } from "bun:test";

import { partA, partB } from "./day_09.js";

const input = ["0 3 6 9 12 15", "1 3 6 10 15 21", "10 13 16 21 30 45"];

test("day 09 Part A should return the correct value", () => {
  expect(partA(input)).toEqual(114);
});

test("day 09 Part B should return the correct value", () => {
  expect(partB(input)).toEqual(2);
});
