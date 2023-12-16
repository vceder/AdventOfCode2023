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
  const foundEnd = positions.map(() => []);

  while (!foundEnd.every((found) => found.length > 2)) {
    positions.forEach(
      (position, i) =>
        position.endsWith(target) && foundEnd[i].push({ steps, position })
    );
    positions = positions.map(
      (position) => nodes[position][moves[steps % moves.length]]
    );
    steps++;
  }
  const differences = foundEnd.map(([first, second, third]) =>
    second.steps - first.steps && third.steps - second.steps
      ? second.steps - first.steps
      : "XXXX"
  );

  return findLeastCommonMultiple(differences);
};

export function findLeastCommonMultiple(numbers) {
  const gcd = (a, b) => {
    if (b === 0) {
      return a;
    }
    return gcd(b, a % b);
  };

  const lcm = (a, b) => (a * b) / gcd(a, b);

  let result = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    result = lcm(result, numbers[i]);
  }

  return result;
}

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
