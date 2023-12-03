import { isNumber, sum } from "../utils";

export const buildMatrix = (lines) => lines.map((line) => line.split(""));

export const buildParts = (matrix, validator = isNumber) => {
  const parts = [];
  for (let y = 0; y < matrix.length; y++) {
    const row = matrix[y];
    for (let x = 0; x < row.length; x++) {
      const char = row[x];
      if (validator(char)) {
        const part = {
          x,
          y,
          value: char,
        };
        let next = 1;
        while (validator(row[x + next])) {
          part.value += row[x + next];
          next++;
        }
        x += next;

        parts.push(part);
      }
    }
  }
  return parts;
};
export const generatePositions = (start, end) => {
  return new Array(end - start)
    .fill(undefined)
    .map((_, index) => start + index);
};

export const checkIfPartIsValid = (part, matrix, validator) => {
  const adjacent = [
    ...generatePositions(part.x - 1, part.x + part.value.length + 1).map(
      (x) => ({ x, y: part.y - 1 })
    ),
    ...generatePositions(part.x - 1, part.x + part.value.length + 1).map(
      (x) => ({ x, y: part.y })
    ),
    ...generatePositions(part.x - 1, part.x + part.value.length + 1).map(
      (x) => ({ x, y: part.y + 1 })
    ),
  ]
    .filter(({ x, y }) => x >= 0 && y >= 0 && y < matrix[0].length)
    .filter((part) => validator(part, matrix));

  return adjacent.length > 0 ? adjacent : false;
};

export const partAValidator = ({ x, y }, matrix) =>
  !isNumber(matrix[y][x]) && matrix[y][x] !== "." && matrix[y][x] !== undefined;

export const partA = (input) => {
  const matrix = buildMatrix(input);
  const parts = buildParts(matrix);
  return parts
    .filter((part) => checkIfPartIsValid(part, matrix, partAValidator))
    .map(({ value }) => value)
    .reduce(sum, 0);
};

export const partB = (input) => {
  const matrix = buildMatrix(input);
  const possibleGears = buildParts(matrix, (char) => char === "*");
  const parts = buildParts(matrix);

  return possibleGears
    .map((gear) => {
      const adjacent = checkIfPartIsValid(gear, matrix, ({ x, y }, matrix) =>
        isNumber(matrix[y][x])
      );

      if (!adjacent || adjacent.length < 2) return false;

      const gears = adjacent
        .map(({ x, y }) =>
          parts.find(
            (part) =>
              part.y === y && part.x <= x && x <= part.x + part.value.length
          )
        )
        .reduce(
          (uniques, part) =>
            !uniques.some(({ x, y }) => x === part.x && y === part.y)
              ? [...uniques, part]
              : uniques,
          []
        );

      return gears;
    })
    .filter((cog) => cog.length === 2)
    .map(([{ value: first }, { value: second }]) => first * second)
    .reduce(sum, 0);
};
