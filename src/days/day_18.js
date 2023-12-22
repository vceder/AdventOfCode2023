import { sum } from "../utils";

const buildPath = (directions) => {
  let row = 0;
  let col = 0;
  let minRow = row;
  let minCol = col;
  const path = [{ row, col }];
  for (const { direction, distance } of directions) {
    // console.log(`direction: ${direction} distance: ${distance}`);
    if (direction === "U") row -= distance;
    if (direction === "R") col += distance;
    if (direction === "D") row += distance;
    if (direction === "L") col -= distance;

    if (row < minRow) minRow = row;
    if (col < minCol) minCol = col;

    path.push({ row, col });
  }

  return path.map(({ row, col }) => ({
    row: Math.abs(minRow) + row,
    col: Math.abs(minCol) + col,
  }));
};

const calculatePolygonArea = (path) => {
  const n = path.length;
  let area = 0;

  for (let i = 0; i < n; i++) {
    const currentNode = path[i];
    const nextNode = path[(i + 1) % n];

    area += currentNode.row * nextNode.col - currentNode.col * nextNode.row;
  }

  return Math.abs(area / 2);
};

export const getTotalArea = (path) => {
  // const vertices = generateVertices(path);
  const vertices = path;
  // console.log(vertices);
  const innerArea = calculatePolygonArea(vertices);

  return innerArea + vertices.length / 2 + 1;
};

const generateVertices = (path) => {
  let prevNode = path[0];
  let nextNode = path[1];
  let nextNodeIndex = 1;
  let row = prevNode.row;
  let col = prevNode.col;
  const vertices = [];

  while (nextNode) {
    if (row === nextNode.row && col === nextNode.col) {
      nextNode = path[++nextNodeIndex];
      continue;
    }

    if (row < nextNode.row) row++;
    if (row > nextNode.row) row--;
    if (col < nextNode.col) col++;
    if (col > nextNode.col) col--;
    vertices.push({ row, col });
  }
  return vertices;
};

const getMatrixWithPathMarked = (path) => {
  let maxRow = 0;
  let maxCol = 0;
  for (const { row, col } of path) {
    // console.log(row, col);
    if (row > maxRow) maxRow = row;
    if (col > maxCol) maxCol = col;
  }

  const matrix = [];
  for (let row = 0; row <= maxRow; row++) {
    matrix[row] = [];
    for (let col = 0; col <= maxCol; col++) {
      matrix[row][col] = { row, col };
    }
  }

  const vertices = generateVertices(path);

  for (const { row, col } of vertices) {
    // console.log(row, col);
    matrix[row][col] = { row, col, edge: true, inside: true };
  }
  setInsideOutside(matrix);
  return matrix;
};

export const setInsideOutside_Recursive = (matrix) => {
  const checkIfNeighborIsInside = (row, col) => {
    if (matrix[row]?.[col] === undefined) return false;
    if (matrix[row]?.[col]?.inside === true) return true;
    if (matrix[row]?.[col]?.inside === false) return false;

    return (
      checkIfNeighborIsInside(row - 1, col) &&
      checkIfNeighborIsInside(row, col + 1) &&
      checkIfNeighborIsInside(row + 1, col) &&
      checkIfNeighborIsInside(row, col - 1)
    );
  };

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col].inside) continue;

      matrix[row][col] = checkIfNeighborIsInside(row, col);
    }
  }
};

const setInsideOutside_NonRecursive = (matrix) => {
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  const rows = matrix.length;
  const cols = matrix[0].length;
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const queue = [];

  // Start from the edges
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (
        (row === 0 || col === 0 || row === rows - 1 || col === cols - 1) &&
        !matrix[row][col].edge
      ) {
        queue.push([row, col]);
        visited[row][col] = true;
      }
    }
  }

  // Flood fill from the edges
  while (queue.length) {
    const [row, col] = queue.shift();
    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;
      if (
        newRow >= 0 &&
        newRow < rows &&
        newCol >= 0 &&
        newCol < cols &&
        !visited[newRow][newCol] &&
        !matrix[newRow][newCol].edge
      ) {
        visited[newRow][newCol] = true;
        queue.push([newRow, newCol]);
      }
    }
  }

  // Mark the encircled cells
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (!matrix[row][col].edge) {
        matrix[row][col].inside = !visited[row][col];
      }
    }
  }
};

export const setInsideOutside = (matrix) =>
  setInsideOutside_NonRecursive(matrix);

const drawMatrix = (matrix, func = ({ inside }) => (inside ? "#" : ".")) =>
  console.log(matrix.map((row) => row.map(func).join("")).join("\n"));

export const partA = (input) => {
  const path = buildPath(
    input
      .map((line) => line.split(" "))
      .map(([direction, distance]) => ({
        direction,
        distance: Number(distance),
      }))
  );
  return getTotalArea(generateVertices(path));
  // generateVertices(path);
  // const matrix = getMatrixWithPathMarked(path);
  // drawMatrix(matrix, ({ edge, inside }) => (edge ? "X" : inside ? "#" : "."));
  // return matrix
  //   .map((row) => row.filter(({ inside }) => inside).length)
  //   .reduce(sum, 0);
  // drawVertices(path);
  // return getArea(path);
};
// 80705 <- Too high

export const partB = (input) => {
  const path = buildPath(
    input
      .map((row) => row.split("("))
      .map(([, hex]) => hex.replace(")", "").replace("#", ""))
      .map((hex) => ({
        direction: "RDLU"[Number(hex.slice(-1))],
        distance: parseInt(hex.slice(0, 5), 16),
      }))
  );

  return getTotalArea(generateVertices(path));
  // return getMatrixWithPathMarked(path)
  //   .map((row) => row.filter(({ inside }) => inside).length)
  //   .reduce(sum, 0);
};
