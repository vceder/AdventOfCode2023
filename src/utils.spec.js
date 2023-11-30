import { expect, test } from "bun:test";
import { readFile } from "./utils";

test("should read file and return it as an array splitted on newlines", async () => {
  const lines = await readFile("src/data/test.txt");
  expect(lines).toBeArrayOfSize(3);
  expect(lines[0]).toEqual("A A");
  expect(lines[1]).toEqual("B B");
  expect(lines[2]).toEqual("C C");
});
