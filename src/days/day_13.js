const mirrorCheck = (start, rows, steps = 0) => {
  const left = rows[start - steps];
  const right = rows[start + steps + 1];

  if (left === undefined || right === undefined) return true;

  return left === right && mirrorCheck(start, rows, steps + 1);
};

export const findRowMirror = (rows, override) => {
  for (let index = 0; index < rows.length - 1; index++) {
    if (mirrorCheck(index, rows) && index + 1 !== override) return index + 1;
  }
};

export const findColumnMirror = (rows, override) => {
  const columns = [];
  for (let index = 0; index < rows[0].length; index++) {
    columns.push(rows.map((row) => row[index]).join(""));
  }

  return findRowMirror(columns, override);
};

const rowColReduce = (total, { row, col }) => ({
  row: total.row + (row ?? 0),
  col: total.col + (col ?? 0),
});

export const partA = (input) => {
  const { row, col } = input
    .join("\n")
    .split("\n\n")
    .map((rows) => rows.split("\n"))
    .map((rows) => ({
      row: findRowMirror(rows),
      col: findColumnMirror(rows),
    }))
    .reduce(rowColReduce, { row: 0, col: 0 });
  return 100 * row + col;
};

export const generatePossibleCleanMirrors = (mirror) => {
  const mirrors = [];
  for (let index = 0; index < mirror.length; index++) {
    const newMirror =
      mirror.substring(0, index) +
      (mirror[index] === "."
        ? "#"
        : mirror[index] === "#"
        ? "."
        : mirror[index]) +
      mirror.substring(index + 1);
    if (newMirror !== mirror) mirrors.push(newMirror);
  }

  return mirrors;
};

export const partB = (input) => {
  const { row, col } = input
    .join("\n")
    .split("\n\n")
    .map((mirror) => {
      const originalRow = findRowMirror(mirror.split("\n"));
      const originalCol = findColumnMirror(mirror.split("\n"));
      const { rows, cols } = generatePossibleCleanMirrors(mirror)
        .map((possibleMirror) => possibleMirror.split("\n"))
        .map((rows) => ({
          row: findRowMirror(rows, originalRow),
          col: findColumnMirror(rows, originalCol),
        }))
        .filter(({ row, col }) => row || col)
        .reduce(
          ({ rows, cols }, { row, col }) => ({
            rows: [...rows, row],
            cols: [...cols, col],
          }),
          { rows: [], cols: [] }
        );

      const row = rows.filter((row) => row).find((row) => row !== originalRow);
      const col = cols.filter((col) => col).find((col) => col !== originalCol);
      return { row, col };
    })
    .reduce(rowColReduce, { row: 0, col: 0 });

  return 100 * row + col;
  // 21325 <- too low
  // 39971 <- too high
  // 24757 <- too low
  // 34536 <- just right
};
