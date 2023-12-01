import { expect, test } from "bun:test";

import { makePairs, partA, partB } from "./day_01.js";
import { replaceWordsToNumbers } from "../utils.js";

const inputA = ["1abc2", "pqr3stu8vwx", "a1b2c3d4e5f", "treb7uchet"];
const inputB = [
  "two1nine",
  "eightwothree",
  "abcone2threexyz",
  "xtwone3four",
  "4nineeightseven2",
  "zoneight234",
  "7pqrstsixteen",
];

test("day 01 Part A should return the correct value", () => {
  expect(partA(inputA)).toEqual(142);
});

test("day 01 Part B should return the correct value", () => {
  expect(partB(inputB)).toEqual(281);
});

test("make pairs", () => {
  expect(inputA.map((line) => makePairs(line))).toEqual([
    "12",
    "38",
    "15",
    "77",
  ]);
  expect(makePairs(replaceWordsToNumbers("two1nine"))).toEqual("29");
  expect(inputB.map((line) => makePairs(replaceWordsToNumbers(line)))).toEqual([
    "29",
    "83",
    "13",
    "24",
    "42",
    "14",
    "76",
  ]);
});
