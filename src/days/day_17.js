const buildGraph = (input) => {
  const nodes = input.map((line, row) =>
    line
      .split("")
      .map((heatLoss, col) => ({ heatLoss: Number(heatLoss), row, col }))
  );
  for (let row = 0; row < nodes.length; row++) {
    for (let col = 0; col < nodes[row].length; col++) {
      const element = nodes[row][col];
      element.north = nodes[row - 1]?.[col];
      element.east = nodes[row]?.[col + 1];
      element.south = nodes[row + 1]?.[col];
      element.west = nodes[row - 1]?.[col];
    }
  }
  return { start: nodes[0][0], end: nodes.at(-1).at(-1) };
};

const findBestPath = (start, target) => {
  let currentNode = start;
  const visited = [];
  while (currentNode !== null) {
    let minDistance = Infinity;
    for (const direction of ["north", "east", "south", "west"]) {
    }
  }
};

export const partA = (input) => {
  const { start, end } = buildGraph(input);
  const result = findBestPath(start, end, input);
  // console.log(start);
  console.log(result);
  return result.distance;
};

export const partB = (input) => {};
