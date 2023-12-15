import { sum } from "../utils";

export const shiftBoard = (board, direction = { row: -1, col: 0 }) => {
  const shiftedBoard = board.map((row) => [...row]);
  let moved = 0;

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] === "O") {
        if (board[row + direction.row]?.[col + direction.col] === ".") {
          shiftedBoard[row + direction.row][col + direction.col] = "O";
          shiftedBoard[row][col] = ".";
          moved++;
        }
      }
    }
  }
  if (moved === 0) return board;
  else return shiftBoard(shiftedBoard);
};

export const rotateBoard = (matrix) =>
  // matrix[0].map((_, index) => matrix.map((row) => row[row.length - 1 - index]));
  matrix[0].map((val, index) => matrix.map((row) => row[index]).reverse());

const printBoard = (board) =>
  console.log(board.map((row) => row.join(" ")).join("\n"));
export const cycleBoard = (board) => {
  board = shiftBoard(board); //, { row: -1, col: 0 }); // NORTH
  board = rotateBoard(board);

  board = shiftBoard(board); //, { row: 0, col: -1 }); // WEST
  board = rotateBoard(board);

  board = shiftBoard(board); //, { row: 1, col: 0 }); // SOUTH
  board = rotateBoard(board);

  board = shiftBoard(board); //, { row: 0, col: 1 }); // EAST
  board = rotateBoard(board);
  return board;
};

export const partA = (input) =>
  shiftBoard(input.map((row) => row.split("")))
    .map(
      (row, index, board) =>
        row.filter((element) => element === "O").length * (board.length - index)
    )
    .reduce(sum, 0);

export const partB = (input) => {
  let board = input.map((row) => row.split(""));
  let check = false;
  const boards = {};
  let patterns = 0;
  for (let index = 0; index < 1000000000; index++) {
    const boardAsString = board.map((row) => row.join("")).join("\n");
    if (boards[boardAsString] === undefined) {
      boards[boardAsString] = [index];
    } else {
      boards[boardAsString].push(index);
      if (boards[boardAsString].length >= 5) {
        const [first, second, third] = boards[boardAsString];
        if (second - first === third - second) {
          patterns++;
          if (patterns > third - second) {
            board = Object.entries(boards)
              .find(([_, indexes]) =>
                indexes.some(
                  (boardIndex) =>
                    boardIndex ===
                    ((1000000000 - first) % (second - first)) + first
                )
              )[0]
              .split("\n")
              .map((row) => row.split(""));
            break;
          }
        }
      }
    }
    board = cycleBoard(board);
  }

  return board
    .map(
      (row, index, board) =>
        row.filter((element) => element === "O").length * (board.length - index)
    )
    .reduce(sum, 0);
};

// 98510 too hight
// 89089 just right
