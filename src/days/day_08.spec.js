import { expect, test } from "bun:test";

import { partA, partB } from "./day_08.js";

const input_1 = [
  "RL",
  "",
  "AAA = (BBB, CCC)",
  "BBB = (DDD, EEE)",
  "CCC = (ZZZ, GGG)",
  "DDD = (DDD, DDD)",
  "EEE = (EEE, EEE)",
  "GGG = (GGG, GGG)",
  "ZZZ = (ZZZ, ZZZ)",
];
const input_2 = [
  "LLR",
  "",
  "AAA = (BBB, BBB)",
  "BBB = (AAA, ZZZ)",
  "ZZZ = (ZZZ, ZZZ)",
];

const input_b = [
  "LR",
  "",
  "11A = (11B, XXX)",
  "11B = (XXX, 11Z)",
  "11Z = (11B, XXX)",
  "22A = (22B, XXX)",
  "22B = (22C, 22C)",
  "22C = (22Z, 22Z)",
  "22Z = (22B, 22B)",
  "XXX = (XXX, XXX)",
];
test("day 08 Part A should return the correct value", () => {
  expect(partA(input_1)).toEqual(2);
  expect(partA(input_2)).toEqual(6);
});

test("day 08 Part B should return the correct value", () => {
  expect(partB(input_b)).toEqual(6);
});
