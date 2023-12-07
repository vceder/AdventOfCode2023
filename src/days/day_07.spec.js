import { expect, test } from "bun:test";

import { partA, partB } from "./day_07.js";

const input = ["32T3K 765", "T55J5 684", "KK677 28", "KTJJT 220", "QQQJA 483"];

test("day 07 Part A should return the correct value", () => {
  expect(partA(input)).toEqual(6440);
});

test("day 07 Part B should return the correct value", () => {
  expect(partB(input)).toEqual(5905);
});
