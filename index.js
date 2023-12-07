import * as day_01 from "./src/days/day_01";
import * as day_02 from "./src/days/day_02";
import * as day_03 from "./src/days/day_03";
import * as day_04 from "./src/days/day_04";
import * as day_05 from "./src/days/day_05";
import * as day_06 from "./src/days/day_06";
import * as day_07 from "./src/days/day_07";

import { readFile, scaffoldDay } from "./src/utils";
const days = [day_01, day_02, day_03, day_04, day_05, day_06, day_07];
const prompt = "Welcome to Ceder's 2023 AoC, what would you like to do? \n$: ";
process.stdout.write(prompt);

const handleInput = async (line) => {
  if (["exit", "stop", "end"].some((stop) => stop === line)) {
    process.exit();
  } else if (line === "help") {
    console.log(
      "run 01 a runs the code for that day, generate 01 scaffolds it, all runs all"
    );
  } else if (line === "all") {
    days.forEach(async (day, i) => {
      const input = await readFile(
        `src/data/day_${String(i + 1).toLocaleString({
          minimumIntegerDigits: 2,
        })}.txt`
      );
      day.partA(input);
      day.partB(input);
    });
  } else if (line.startsWith("run")) {
    const [, day, part] = line.split(" ");
    if (day > days.length) return console.log("no time travel");

    const input = await readFile(
      `src/data/day_${String(day).toLocaleString({
        minimumIntegerDigits: 2,
      })}.txt`
    );
    if (part) {
      console.log(
        days[Number(day) - 1][part === "a" ? "partA" : "partB"](input)
      );
    } else {
      console.log(days[Number(day) - 1].partA(input));
      console.log(days[Number(day) - 1].partB(input));
    }
  } else if (line.startsWith("gen")) {
    const [, day] = line.split(" ");
    scaffoldDay(Number(day));
  } else {
    console.log("unknown option");
  }
};

for await (const line of console) {
  await handleInput(line);

  process.stdout.write("$: ");
}
