import { expect, test } from "bun:test";

import { hash, partA, partB } from "./day_15.js";

const input = ["rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7"];

test("should hash input correctly", () => {
  expect(hash("HASH")).toEqual(52);
  expect(hash("rn=1")).toEqual(30);
  expect(hash("cm-")).toEqual(253);
  expect(hash("qp=3")).toEqual(97);
  expect(hash("cm=2")).toEqual(47);
  expect(hash("qp-")).toEqual(14);
  expect(hash("pc=4")).toEqual(180);
  expect(hash("ot=9")).toEqual(9);
  expect(hash("ab=5")).toEqual(197);
  expect(hash("pc-")).toEqual(48);
  expect(hash("pc=6")).toEqual(214);
  expect(hash("ot=7")).toEqual(231);
});

test("day 15 Part A should return the correct value", () => {
  expect(partA(input)).toEqual(1320);
});

test("day 15 Part B should return the correct value", () => {
  expect(partB(input)).toEqual(145);
});
