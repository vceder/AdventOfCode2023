import { product } from "../utils";

const buildRaces = (input) => {
  const [time, distance] = input.map((row) =>
    row
      .split(":")
      .map((char) =>
        char
          .trim()
          .split(/\s+/)
          .map((number) => Number(number))
      )
      .flat()
      .filter((number) => !isNaN(number))
  );
  const races = time.map((value, i) => ({
    time: value,
    distance: distance[i],
  }));
  return races;
};

export const getWinningStrategies = ({ time: totalTime, distance: toBeat }) => {
  const winnings = [];
  for (let holdTime = 0; holdTime < totalTime; holdTime++) {
    const raceTime = totalTime - holdTime;
    const distance = raceTime * holdTime;
    if (distance > toBeat) winnings.push(holdTime);
  }
  return winnings;
};

export const partA = (input) => {
  const races = buildRaces(input);
  return races
    .map(getWinningStrategies)
    .map((strategy) => strategy.length)
    .reduce(product, 1);
};

export const partB = (input) => {
  const race = buildRaces(input).reduce(
    (race, { time, distance }) => ({
      time: Number(race.time + String(time)),
      distance: Number(race.distance + String(distance)),
    }),
    { time: "", distance: "" }
  );
  return getWinningStrategies(race).length;
};
