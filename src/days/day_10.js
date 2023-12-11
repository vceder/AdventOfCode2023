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

const getEnclosed = (loop, matrix) => {
  // const rows = loop.reduce((rows, node) => {
  //   if (rows?.at(-1)?.at(-1)?.y === node.y) {
  //     rows.at(-1).push(node);
  //   } else {
  //     rows.push([node]);
  //   }
  //   return rows;
  // }, []);
  const rows = {};
  for (let index = 0; index < loop.length; index++) {
    const element = loop[index];
    if (rows[element.y]) rows[element.y].push(element);
    else rows[element.y] = [element];
  }

  // console.log(rows);
  // Object.values(rows).forEach((row) => console.log(row[0].y, row.length));
  const formatted = Object.values(rows).map(
    (row) => row.toSorted((a, b) => a.x - b.x)
    // .map((node) => node.char)
    // .join("")
  );
  const lengths = formatted.map((row) =>
    row.reduce(
      (total, current, i) =>
        i % 2 == 0
          ? (total += row[i + 1] ? row[i + 1].x - current.x - 1 : 0)
          : total,
      0
    )
  );
  console.log(lengths);
  return lengths;
  // rows.forEach((row) => console.log(row.length, row[0].y));
  // for (let y = 0; y < rows.length; y++) {
  //   for (let x = 0; x < rows[y].length; x += 2) {
  //     const left = rows[y][x];
  //     const right = rows[y][x + 1];
  //     // console.log(rows[y]);
  //     // console.log(left);
  //     // console.log(right);

  //     console.log("diff:", right.x - left.x);
  //   }
  // }
  // console.log(rows);
};

const buildLoop = (start, matrix) => {
  const startingDirection = [...directions]
    .reverse()
    .find((direction) => start[direction]);
  return getNext(startingDirection, start, matrix);
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
  const loop = buildLoop(start, matrix);
  return getEnclosed(loop, matrix).reduce(sum, 0);
};
