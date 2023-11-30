// import * as day_01 from "./src/days/day_01";
import { readFile, scaffoldDay } from "./src/utils";
const days = [];
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
        })}`
      );
      day.partA(input);
      day.partB(input);
    });
  } else if (line.startsWith("run")) {
    const [, day, part] = line.split(" ");
    if (day > days.length) return console.log("no time travel");

    const input = await readFile(
      `src/data/day_${String(i + 1).toLocaleString({
        minimumIntegerDigits: 2,
      })}`
    );
    if (part) {
      days[day][part === "a" ? "partA" : "partB"](input);
    } else {
      days[day].partA(input);
      days[day].partB(input);
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
