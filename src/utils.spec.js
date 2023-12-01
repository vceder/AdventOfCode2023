import { expect, test } from "bun:test";
import {
  readFile,
  isNumber,
  getFirstAndLast,
  wordsIsNumber,
  replaceWordsToNumbers,
} from "./utils";

test("should read file and return it as an array splitted on newlines", async () => {
  const lines = await readFile("src/data/test.txt");
  expect(lines).toBeArrayOfSize(3);
  expect(lines[0]).toEqual("A A");
  expect(lines[1]).toEqual("B B");
  expect(lines[2]).toEqual("C C");
});

test("Should return true for number", () => {
  expect(isNumber("0")).toBeTrue();
  expect(isNumber("1")).toBeTrue();
  expect(isNumber("2")).toBeTrue();
  expect(isNumber("3")).toBeTrue();
  expect(isNumber("4")).toBeTrue();
  expect(isNumber("5")).toBeTrue();
  expect(isNumber("6")).toBeTrue();
  expect(isNumber("7")).toBeTrue();
  expect(isNumber("8")).toBeTrue();
  expect(isNumber("9")).toBeTrue();
  expect(isNumber("a")).toBeFalse();
});

test("Should get the first and last item from array with a reducer", () => {
  const short = ["A", "B"];
  const long = ["A", "B", "C", "D"];
  expect(short.reduce(getFirstAndLast, [])).toBeArrayOfSize(2);
  expect(long.reduce(getFirstAndLast, [])).toBeArrayOfSize(2);
  expect("219".split("").reduce(getFirstAndLast, [])).toEqual(["2", "9"]);
});

test("Written number should be a literal number", () => {
  expect(wordsIsNumber("one")).toEqual(1);
  expect(wordsIsNumber("word")).toBeUndefined();
});

test("Should replace word with a number in a string", () => {
  expect(replaceWordsToNumbers("two1nine")).toEqual("2wo19ine");
  expect(replaceWordsToNumbers("zoneight234")).toEqual("z1n8ight234");
  expect(replaceWordsToNumbers("eightwothree")).toEqual("8igh2wo3hree");
  expect(replaceWordsToNumbers("fourfourfour")).toEqual("4our4our4our");
  expect(
    replaceWordsToNumbers("pssfncbhqpfour1dgcjqpccfzfntphmtjthree1sixfour")
  ).toEqual("pssfncbhqp4our1dgcjqpccfzfntphmtj3hree16ix4our");
});
