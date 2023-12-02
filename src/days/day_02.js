import { sum } from "../utils";

const makeGames = (input) =>
  input.reduce((games, game) => {
    const [id, draws] = game.split(":");

    const formattedId = Number(id.split(" ")[1]);

    const formattedDraws = draws.split(";").map((draw) =>
      draw.split(",").map((draw) => {
        const [amount, color] = draw.trim().split(" ");
        return { amount: Number(amount), color };
      })
    );

    return [
      ...games,
      {
        id: formattedId,
        draws: formattedDraws,
      },
    ];
  }, []);

export const partA = (input) => {
  const limits = { red: 12, green: 13, blue: 14 };
  return makeGames(input)
    .filter((game) =>
      game.draws.every((draw) =>
        draw.every(({ amount, color }) => amount <= limits[color])
      )
    )
    .map(({ id }) => id)
    .reduce(sum, 0);
};

export const partB = (input) =>
  makeGames(input)
    .map((game) => {
      const minimums = { red: 0, blue: 0, green: 0 };
      game.draws.forEach((draw) =>
        draw.forEach(({ amount, color }) => {
          if (amount > minimums[color]) minimums[color] = amount;
        })
      );
      return minimums;
    })
    .map(({ red, blue, green }) => red * blue * green)
    .reduce(sum, 0);
