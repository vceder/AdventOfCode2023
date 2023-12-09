const buildConversionTable = (data) =>
  data.reduce((maps, map) => {
    const [key, values] = map.split(":");
    const [from, to] = key.replace(" map", "").split("-to-");

    if (to === undefined) return maps;

    const conversion = values
      .split("\n")
      .filter((row) => row !== "")
      .map((value) => value.split(" ").map((number) => Number(number)))
      .reduce(
        (conversionTable, [output, input, range]) => [
          ...conversionTable,
          { start: input, end: input + range, output },
        ],
        []
      );

    return [
      ...maps,
      {
        from,
        to,
        conversion,
      },
    ];
  }, []);

const getSeeds = (data) =>
  data[0]
    .split(":")[1]
    .trim()
    .split(" ")
    .map((number) => Number(number));

const convertSeedToLocation = (
  seed,
  maps,
  start = "seed",
  direction = "forward"
) => {
  let type = start;
  let value = seed;
  while (type) {
    const table = maps.find(({ from }) => from === type);

    if (!table) break;

    const conversion = table.conversion.find(
      ({ start, end }) => start <= value && value <= end
    );
    if (conversion) {
      value = conversion.output + value - conversion.start;
    }
    type = table?.[direction === "forward" ? "to" : "from"];
  }
  return value;
};

const convertSeedRangeToLocationRange = (startRange, maps) => {
  const toDo = [{ ...startRange, type: "seed" }];
  const done = [];
  while (toDo.length > 0) {
    let range = toDo.shift();

    while (true) {
      const table = maps.find(({ from }) => from === range.type);
      if (!table || range.type === "location") {
        done.push({ ...range });
        break;
      }
      const conversion = table.conversion.find(
        ({ start, end }) => start <= range.start && range.start < end
      );

      if (conversion) {
        if (conversion.end >= range.end) {
          range.start = conversion.output + range.start - conversion.start;
          range.end = conversion.output + range.end - conversion.start;
        } else {
          toDo.push({
            start: conversion.end,
            end: range.end,
            type: range.type,
          });

          range.start = conversion.output + range.start - conversion.start;
          range.end = conversion.output + conversion.end - conversion.start + 1;
        }
      }
      range.type = table.to;
    }
  }
  return done;
};

export const partA = (input) => {
  const data = input.join("\n").split("\n\n");
  const maps = buildConversionTable(data);
  const seeds = getSeeds(data);

  return seeds
    .map((seed) => convertSeedToLocation(seed, maps))
    .sort((a, b) => a - b)[0];
};

export const partB = (input) => {
  const data = input.join("\n").split("\n\n");
  const maps = buildConversionTable(data);
  const seeds = getSeeds(data).reduce((seeds, seed, i) => {
    if (i % 2) {
      seeds.at(-1).end = seeds.at(-1).start + seed;
      return seeds;
    }
    return [...seeds, { start: seed, end: 0 }];
  }, []);
  return seeds
    .map((seedRange) => convertSeedRangeToLocationRange(seedRange, maps))
    .flat()
    .sort((a, b) => a.start - b.start)[0].start;
  // 107430936 <- too high
  //23738616
};
