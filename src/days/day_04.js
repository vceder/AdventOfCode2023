import { sleep } from "bun";
import { sum } from "../utils";

const makeCard = (input, index) => {
  const [id, values] = input.split(":");
  const [drawings, winnings] = values.split("|").map((section) =>
    section
      .split(" ")
      .filter((number) => number !== "")
      .map(Number)
  );
  return {
    id,
    index,
    drawings,
    winnings,
  };
};

const findWinnings = ({ drawings, winnings }) =>
  drawings.filter((number) =>
    winnings.some((winningNumber) => winningNumber === number)
  );

export const partA = (input) =>
  input
    .map(makeCard)
    .map(findWinnings)
    .filter((winnings) => winnings.length >= 1)
    .map((winnings) => winnings.reduce((sum) => sum * 2, 0.5))
    .reduce(sum, 0);

export const partB = (input) => {
  const cards = input.map(makeCard);
  const processQueue = [...cards];
  const counter = {};
  let toProcess = processQueue.shift();
  while (toProcess) {
    const winnings = findWinnings(toProcess);

    if (counter[toProcess.id]) counter[toProcess.id]++;
    else counter[toProcess.id] = 1;

    winnings.forEach((_, i) => {
      processQueue.push(cards[toProcess.index + i + 1]);
    });

    toProcess = processQueue.shift();
  }

  return Object.values(counter).reduce(sum, 0);
};
