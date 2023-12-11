import { expect, test } from "bun:test";

import { partA, partB } from "./day_10.js";

const input_simple = ["-L|F7", "7S-7|", "L|7||", "-L-J|", "L|-JF"];

const input_complex = ["7-F7-", ".FJ|7", "SJLL7", "|F--J", "LJ.LJ"];

const input_cavity = [
  "...........",
  ".S-------7.",
  ".|F-----7|.",
  ".||.....||.",
  ".||.....||.",
  ".|L-7.F-J|.",
  ".|..|.|..|.",
  ".L--J.L--J.",
  "...........",
];

const input_cavity_large_with_junk = [
  "FF7FSF7F7F7F7F7F---7",
  "L|LJ||||||||||||F--J",
  "FL-7LJLJ||||||LJL-77",
  "F--JF--7||LJLJ7F7FJ-",
  "L---JF-JLJ.||-FJLJJ7",
  "|F|F-JF---7F7-L7L|7|",
  "|FFJF7L7F-JF7|JL---7",
  "7-L-JL7||F7|L7F-7F7|",
  "L.L7LFJ|||||FJL7||LJ",
  "L7JLJL-JLJLJL--JLJ.L",
];

const input_cavity_large_no_junk = [
  ".F----7F7F7F7F-7....",
  ".|F--7||||||||FJ....",
  ".||.FJ||||||||L7....",
  "FJL7L7LJLJ||LJ.L-7..",
  "L--J.L7...LJS7F-7L7.",
  "....F-J..F7FJ|L7L7L7",
  "....L7.F7||L7|.L7L7|",
  ".....|FJLJ|FJ|F7|.LJ",
  "....FJL-7.||.||||...",
  "....L---J.LJ.LJLJ...",
];
test("day 10 Part A should return the correct value", () => {
  expect(partA(input_simple)).toEqual(4);
  expect(partA(input_complex)).toEqual(8);
});

test("day 10 Part B should return the correct value", () => {
  expect(partB(input_cavity)).toEqual(4);
  expect(partB(input_cavity_large_no_junk)).toEqual(8);
  expect(partB(input_cavity_large_with_junk)).toEqual(10);
});
