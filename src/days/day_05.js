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

const convertSeedRangeToLocationRangeRecursive = (
  seedRange, // {start, end}
  maps,
  type = "seed"
) => {
  const table = maps.find(({ from }) => from === type);
  // console.log("going down:", type);
  if (table === undefined) {
    // console.log(`bottom found, returning ${seedRange}`);
    return seedRange;
  }

  const conversion = table.conversion.find(({ start, end }) => {
    // console.log(start <= seedRange.start);
    // console.log(seedRange.start <= end);
    return start <= seedRange.start && seedRange.start <= end;
  });
  // console.log(conversion);
  if (conversion === undefined) {
    // console.log("no conversion found");
    return convertSeedRangeToLocationRangeRecursive(seedRange, maps, table.to);
  }
  if (conversion.end >= seedRange.end) {
    // console.log("whole range was in conversion");
    return convertSeedRangeToLocationRangeRecursive(
      {
        start: conversion.output + seedRange.start - conversion.start,
        end: conversion.output + seedRange.end - conversion.start,
      },
      maps,
      table.to
    );
  } else {
    const first = {
      start: conversion.output + seedRange.start - conversion.start,
      end: conversion.output + conversion.end - conversion.start,
    };
    const second = { start: conversion.end, end: seedRange.end };
    // console.log("splitting range");
    // console.log(first);
    // console.log(second);
    return [
      convertSeedRangeToLocationRangeRecursive(first, maps, conversion.to),
      convertSeedRangeToLocationRangeRecursive(second, maps, type),
    ];
  }
};

export const partA = (input) => {
  const data = input.join("\n").split("\n\n");
  const maps = buildConversionTable(data);
  const seeds = getSeeds(data);

  return seeds
    .map((seed) => convertSeedToLocation(seed, maps))
    .sort((a, b) => a - b)[0];
};

// export const partB = (input) => {
//   // const seedsRange = getSeeds(input);
//   const seedsRange = [1778931867, 1436999653];
//   const data = input.join("\n").split("\n\n");
//   const maps = buildConversionTable(data);

//   let seeds = [];
//   for (let index = 0; index < seedsRange.length; index += 2) {
//     const seedStart = seedsRange[index];
//     const range = seedsRange[index + 1];
//     seeds = [
//       ...seeds,
//       ...new Array(range).fill(seedStart).map((value, i) => value + i),
//     ];
//   }
//   console.log(seeds);
//   // console.log(seedsRange.filter((_, i) => !(i % 2)));
//   return seedsRange
//     .filter((_, i) => !(i % 2))
//     .map((seed) => convertSeedToLocation(seed, maps))
//     .sort((a, b) => a - b)[0];
// };

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
  return (
    seeds
      .map((seedRange) => convertSeedRangeToLocationRange(seedRange, maps))
      .flat()
      // .map(({ start }) => start)
      .sort((a, b) => a.start - b.start)[0].start
  ); // 107430936 <- too high
  // return maps;
};
