import { expect, test } from "bun:test";

import { partA, partB } from "./day_16.js";

const input = String.raw`.|...\....
|.-.\.....
.....|-...
........|.
..........
.........\
..../.\\..
.-.-/..|..
.|....-|.\
..//.|....`.split("\n");
test("day 16 Part A should return the correct value", () => {
  expect(partA(input)).toEqual(46);
});

test("day 16 Part B should return the correct value", () => {
  expect(partB(input)).toEqual(51);
});
