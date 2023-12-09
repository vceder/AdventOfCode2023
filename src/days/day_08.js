const makeNodes = (input) =>
  input
    .map((row) => {
      const [value, children] = row.split(" = ");
      const [L, R] = children.replace("(", "").replace(")", "").split(", ");
      return { value, L, R };
    })
    .reduce(
      (nodes, { value, L, R }) => ({
        ...nodes,
        [value]: { L, R },
      }),
      {}
    );

const find = (target, nodes, moves) => {
  let found = "AAA";
  let steps = 0;
  while (found !== target) {
    found = nodes[found][moves[steps % moves.length]];
    steps++;
  }
  return steps;
};

const findMulti = (nodes, moves, start = "A", target = "Z") => {
  let positions = Object.keys(nodes).filter((value) => value.endsWith(start));
  let steps = 0;

  while (!positions.every((position) => position.endsWith(target))) {
    positions = positions.map(
      (position) => nodes[position][moves[steps % moves.length]]
    );
    steps++;
  }
  return steps;
};

export const partA = (input) => {
  const target = "ZZZ";
  const directions = input.shift().split("");
  input.shift();
  const nodes = makeNodes(input);
  return find(target, nodes, directions);
};

export const partB = (input) => {
  const directions = input.shift().split("");
  input.shift();
  const nodes = makeNodes(input);
  return findMulti(nodes, directions);
};
