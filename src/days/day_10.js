import { sum } from "../utils";

/**
 * | is a vertical pipe connecting north and south.
 * - is a horizontal pipe connecting east and west.
 * L is a 90-degree bend connecting north and east.
 * J is a 90-degree bend connecting north and west.
 * 7 is a 90-degree bend connecting south and west.
 * F is a 90-degree bend connecting south and east.
 * . is ground; there is no pipe in this tile.
 * S is the starting position of the animal; there is a pipe on this tile, but your sketch doesn't show what shape the pipe has.
 */
const north = true;
const east = true;
const south = true;
const west = true;

const connections = {
  "|": { north, south },
  "-": { east, west },
  L: { north, east },
  J: { north, west },
  7: { south, west },
  F: { south, east },
  ".": {},
  S: { north, east, south, west },
};

const directionCoordinates = {
  north: { x: 0, y: -1 },
  east: { x: 1, y: 0 },
  south: { x: 0, y: 1 },
  west: { x: -1, y: 0 },
};

const directions = Object.keys(directionCoordinates);

const reverseDirections = directions.reduce(
  (reverse, direction, i) => ({
    ...reverse,
    [direction]: directions[(i + 2) % directions.length],
  }),
  {}
);

const buildMatrix = (input) =>
  input.map((row, y) =>
    row.split("").map((char, x) => ({ x, y, char, ...connections[char] }))
  );

const findChar = (char, matrix) => {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x].char === char) return matrix[y][x];
    }
  }
};

const calculateConnections = (node, matrix) => {
  node.north = matrix[node.y - 1]?.[node.x]?.south ?? false;
  node.east = matrix[node.y]?.[node.x + 1]?.west ?? false;
  node.south = matrix[node.y + 1]?.[node.x]?.north ?? false;
  node.west = matrix[node.y]?.[node.x - 1]?.east ?? false;
};

const getNext = (previousDirection, node, matrix, notStart = false) => {
  if (notStart && node.char === "S") return [];

  const nextDirection = directions
    .filter((direction) => direction !== previousDirection)
    .find((direction) => node[direction]);
  const { x, y } = directionCoordinates[nextDirection];
  const nextNode = matrix[node.y + y][node.x + x];
  return [
    nextNode,
    ...getNext(reverseDirections[nextDirection], nextNode, matrix, true),
  ];
};

const findEnclosedPoints = (matrix) => {
  const inside = [];
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      const element = matrix[row][col];
      if (element !== ".") continue;
      if (
        matrix[row].slice(0, col).filter((char) => "|JL".includes(char))
          .length %
          2 !==
        0
      ) {
        inside.push([row, col]);
      }
    }
  }
  return inside;
};

const buildLoop = (start, matrix) => {
  const startingDirection = [...directions]
    .reverse()
    .find((direction) => start[direction]);
  return getNext(startingDirection, start, matrix);
};

const replaceS = (loop) => {
  const sIndex = loop.findIndex(({ char }) => char === "S");
  loop[sIndex].char = Object.entries(connections).find(
    ([_, con]) =>
      loop[sIndex].north === !!con.north &&
      loop[sIndex].east === !!con.east &&
      loop[sIndex].south === !!con.south &&
      loop[sIndex].west === !!con.west
  )[0];
  return loop;
};

export const partA = (input) => {
  const matrix = buildMatrix(input);
  const start = findChar("S", matrix);
  calculateConnections(matrix[start.y][start.x], matrix);
  return buildLoop(start, matrix).length / 2;
};

export const partB = (input) => {
  const matrix = buildMatrix(input);
  const start = findChar("S", matrix);
  calculateConnections(matrix[start.y][start.x], matrix);
  const loop = replaceS(buildLoop(start, matrix));
  // console.log(
  //   matrix
  //     .map((row) =>
  //       row
  //         .map(
  //           ({ x, y }) =>
  //             loop.find((node) => node.x === x && node.y === y)?.char ?? "."
  //         )
  //         .join("")
  //     )
  //     .join("\n")
  // );

  // 564 <- too high
  // 563 <- just right
  return findEnclosedPoints(
    matrix.map((row) =>
      row.map(
        ({ x, y }) =>
          loop.find((node) => node.x === x && node.y === y)?.char ?? "."
      )
    )
  ).length;
};
