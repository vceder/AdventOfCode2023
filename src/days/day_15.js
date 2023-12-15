import { sum } from "../utils";

export const hash = (input) => {
  let value = 0;
  for (let index = 0; index < input.length; index++) {
    value += input.charCodeAt(index);
    value = value * 17;
    value = value % 256;
  }
  return value;
};

export const partA = ([input]) =>
  input
    .split(",")
    .map((sequence) => hash(sequence))
    .reduce(sum, 0);

export const partB = ([input]) => {
  const boxes = new Array(256).fill(1).map((_) => []);
  input.split(",").forEach((sequence) => {
    if (sequence.includes("=")) {
      const [label, focalLength] = sequence.split("=");
      const index = hash(label);
      const inBox = boxes[index].findIndex((old) => old.label === label);
      if (inBox >= 0) {
        boxes[index][inBox] = { label, focalLength };
      } else {
        boxes[index].push({ label, focalLength });
      }
    } else {
      const label = sequence.replace("-", "");
      const index = hash(label);
      boxes[index] = boxes[index].filter((lens) => lens.label !== label);
    }
  });

  return boxes
    .map((box, index) =>
      box.map(
        ({ focalLength }, boxIndex) =>
          (index + 1) * (boxIndex + 1) * focalLength
      )
    )
    .flat()
    .reduce(sum, 0);
};
