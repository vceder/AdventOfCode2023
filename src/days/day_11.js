import { sum } from "../utils";

const expandReducer = (map, row) =>
  row.every((element) => element === ".") ? [...map, row, row] : [...map, row];

export const expandSpace = (matrix) => {
  const starMap = matrix.reduce(expandReducer, []);

  const starMapColumns = starMap[0]
    .map((_, i) => starMap.map((row) => row[i]))
    .reduce(expandReducer, []);

  return starMapColumns[0].map((_, i) => starMapColumns.map((row) => row[i]));
};

const getEmptyRows = (matrix) =>
  matrix
    .map((row, i) => (row.every((char) => char === ".") ? i : false))
    .filter((a) => a);

const getEmptyColumns = (matrix) => {
  const emptyColumns = [];
  for (let col = 0; col < matrix[0].length; col++) {
    const column = [];
    for (let row = 0; row < matrix.length; row++) {
      column.push(matrix[row][col]);
    }
    if (column.every((char) => char === ".")) emptyColumns.push(col);
  }
  return emptyColumns;
};

export const countAndMarkGalaxies = (starMap) => {
  let counter = 1;
  const galaxies = [];
  for (let row = 0; row < starMap.length; row++) {
    for (let column = 0; column < starMap[row].length; column++) {
      const element = starMap[row][column];
      if (element === "#") {
        starMap[row][column] = counter.toString();
        galaxies.push({ row, column, number: counter });
        counter++;
      }
    }
  }
  return galaxies;
};

export const getDistanceBetweenGalaxies = (a, b) => {
  const xDistance = Math.abs(b.column - a.column);
  const yDistance = Math.abs(b.row - a.row);
  return xDistance + yDistance;
};

export const getDistanceBetweenExpandingGalaxies = (
  a,
  b,
  expansionCols,
  expansionRows,
  expansionFactor = 1000000
) => {
  const adjustCol = (col) =>
    col +
    expansionCols.filter((expCol) => expCol < col).length *
      (expansionFactor - 1);
  const adjustRow = (row) =>
    row +
    expansionRows.filter((expCol) => expCol < row).length *
      (expansionFactor - 1);

  const adjustedACol = adjustCol(a.column);
  const adjustedARow = adjustRow(a.row);
  const adjustedBCol = adjustCol(b.column);
  const adjustedBRow = adjustRow(b.row);

  const xDistance = Math.abs(adjustedBCol - adjustedACol);
  const yDistance = Math.abs(adjustedBRow - adjustedARow);
  return xDistance + yDistance;
};

export const generatePairs = (galaxies) =>
  galaxies
    .reduce(
      (pairs, galaxy) => [
        ...pairs,
        galaxies
          .filter(({ number }) => number !== galaxy.number)
          .map((part) => [galaxy, part]),
      ],
      []
    )
    .flat()
    .reduce((uniques, galaxyPair) => {
      const [a, b] = galaxyPair.sort((a, b) => a.number - b.number);

      if (
        uniques.some(
          (pair) => pair[0].number === a.number && pair[1].number === b.number
        )
      )
        return uniques;
      return [...uniques, [a, b]];
    }, []);

export const partA = (input) => {
  const spaceMap = expandSpace(input.map((row) => row.split("")));
  const emptyRows = getEmptyRows(input.map((row) => row.split("")));
  const emptyColumns = getEmptyColumns(input.map((row) => row.split("")));
  const expandedGalaxies = countAndMarkGalaxies(spaceMap);

  const expandedDistances = generatePairs(expandedGalaxies).map(([a, b]) =>
    getDistanceBetweenGalaxies(a, b)
  );

  const galaxies = countAndMarkGalaxies(input.map((row) => row.split("")));
  const distances = generatePairs(galaxies)
    // .map(([a, b]) => getDistanceBetweenGalaxies(a, b))
    .map(([a, b]) =>
      getDistanceBetweenExpandingGalaxies(a, b, emptyColumns, emptyRows, 2)
    );

  return distances.reduce(sum, 0);
};

export const partB = (input, factor = 1000000) => {
  const matrix = input.map((row) => row.split(""));
  const emptyRows = getEmptyRows(matrix);
  const emptyColumns = getEmptyColumns(matrix);
  const galaxies = countAndMarkGalaxies(matrix);
  const galaxyPairs = generatePairs(galaxies);

  return galaxyPairs
    .map(([a, b]) =>
      getDistanceBetweenExpandingGalaxies(a, b, emptyColumns, emptyRows, factor)
    )
    .reduce(sum, 0);
};
