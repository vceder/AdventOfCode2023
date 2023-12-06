const buildConversionTable = (data) =>
  data.reduce((maps, map) => {
    const [key, values] = map.split(":");
    const [from, to] = key.replace(" map", "").split("-to-");

    if (to === undefined) return maps;

    const conversion = values
      .split("\n")
      .filter((row) => row !== "")
      .map((value) => value.split(" ").map((number) => Number(number)))
      .reduce((conversionTable, [output, input, range]) => {
        const table = { start: input, end: input + range, output };
        // for (let index = 0; index < length; index++) {
        //   table[source + index] = destination + index;
        // }
        // console.log(table);
        return [...conversionTable, table];
      }, []);

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
      seeds.at(-1).stop = seeds.at(-1).start + seed;
      return seeds;
    }
    return [...seeds, { start: seed, stop: 0 }];
  }, []);
  return false;
  // return maps;
};
