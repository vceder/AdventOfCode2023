import { sum } from "../utils";

const makeMatrix = (input) =>
  input.map((line, row) =>
    line
      .split("")
      .map((char, col) => ({ row, col, char, energized: false, visited: [] }))
  );

const DIRECTIONS = {
  NORTH: { row: -1, col: 0 },
  EAST: { row: 0, col: 1 },
  SOUTH: { row: 1, col: 0 },
  WEST: { row: 0, col: -1 },
};
const walkLight = (start, matrix) => {
  const lights = [start];
  while (lights.length > 0) {
    const { row, col, direction } = lights.shift();
    const { row: nextRow, col: nextCol } = DIRECTIONS[direction];
    if (matrix[row]?.[col]) {
      matrix[row][col].energized = true;
      if (!matrix[row]?.[col]?.path)
        matrix[row][col].path =
          direction === "NORTH"
            ? "^"
            : direction === "EAST"
            ? ">"
            : direction === "SOUTH"
            ? "v"
            : "<";
    }

    const nextPosition = matrix[row + nextRow]?.[col + nextCol];
    if (
      nextPosition !== undefined &&
      !nextPosition.visited.some((dir) => dir === direction)
    ) {
      nextPosition.visited.push(direction);
      if (nextPosition.char === ".") {
        lights.push({ ...nextPosition, direction });
      } else if (nextPosition.char === "|") {
        if (direction === "EAST" || direction === "WEST") {
          lights.push({ ...nextPosition, direction: "SOUTH" });
          lights.push({ ...nextPosition, direction: "NORTH" });
        } else {
          lights.push({ ...nextPosition, direction });
        }
      } else if (nextPosition.char === "-") {
        if (direction === "SOUTH" || direction === "NORTH") {
          lights.push({ ...nextPosition, direction: "EAST" });
          lights.push({ ...nextPosition, direction: "WEST" });
        } else {
          lights.push({ ...nextPosition, direction });
        }
      } else if (nextPosition.char === "/") {
        if (direction === "EAST")
          lights.push({ ...nextPosition, direction: "NORTH" });
        else if (direction === "WEST")
          lights.push({ ...nextPosition, direction: "SOUTH" });
        else if (direction === "NORTH")
          lights.push({ ...nextPosition, direction: "EAST" });
        else if (direction === "SOUTH")
          lights.push({ ...nextPosition, direction: "WEST" });
      } else if (nextPosition.char === "\\") {
        if (direction === "EAST")
          lights.push({ ...nextPosition, direction: "SOUTH" });
        else if (direction === "WEST")
          lights.push({ ...nextPosition, direction: "NORTH" });
        else if (direction === "NORTH")
          lights.push({ ...nextPosition, direction: "WEST" });
        else if (direction === "SOUTH")
          lights.push({ ...nextPosition, direction: "EAST" });
      }
    }
  }
  return matrix;
};

const printMatrix = (matrix, drawPath) =>
  console.log(
    matrix
      .map((row) =>
        row
          .map(({ char, energized, path }) =>
            drawPath ? (path ? path : ".") : energized ? "#" : "."
          )
          .join("")
      )
      .join("\n")
  );

export const partA = (input) => {
  const matrix = makeMatrix(input);

  walkLight({ row: 0, col: -1, direction: "EAST" }, matrix);
  return matrix
    .map((row) => row.filter(({ energized }) => energized).length)
    .reduce(sum, 0);
};
// 6875 <- too low
export const partB = (input) => {
  const startingPositions = [
    ...input
      .map((_, i) => [
        { row: i, col: -1, direction: "EAST" },
        { row: i, col: input[0].length, direction: "WEST" },
      ])
      .flat(),
    ...input[0]
      .split("")
      .map((_, i) => [
        { row: -1, col: i, direction: "SOUTH" },
        { row: input.length, col: i, direction: "NORTH" },
      ])
      .flat(),
  ];
  return startingPositions
    .map((start) => walkLight(start, makeMatrix(input)))
    .map((matrix) =>
      matrix
        .map((row) => row.filter(({ energized }) => energized).length)
        .reduce(sum, 0)
    )
    .toSorted((a, b) => b - a)[0];
};

// ######....
// .#...#....
// .#...#####
// .#...##...
// .#...##...
// .#...##...
// .#..####..
// ########..
// .#######..
// .#...#.#..

// ######....
// .#...#....
// .#...#####
// .#...##...
// .#...##...
// .#...##...
// .#..####..
// ########..
// .#######..
// .#...#.#..
