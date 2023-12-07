import { sum } from "../utils";

const cardFaces = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "T",
  "J",
  "Q",
  "K",
  "A",
];
const joker = ["J", "2", "3", "4", "5", "6", "7", "8", "9", "T", "Q", "K", "A"];

const getHandValue = (hand, wildcard) => {
  const patterns = [
    [5],
    [4, 1],
    [3, 2],
    [3, 1, 1],
    [2, 2, 1],
    [2, 1, 1, 1],
    [1, 1, 1, 1, 1],
  ];

  const cards = hand
    .split("")
    .reduce(
      (cards, card) => ({ ...cards, [card]: (cards[card] ?? 0) + 1 }),
      {}
    );
  const sorted = Object.values(cards).sort().reverse();

  let patternValue = patterns.findIndex((pattern) =>
    pattern.every((value, index) => sorted[index] === value)
  );
  if (wildcard && hand.includes(wildcard) && patternValue !== 0) {
    const jokers = cards[wildcard];
    const possibleCombinations = [];
    cardFaces.forEach((face) => {
      let possibleHand = hand;
      for (let joker = 0; joker < jokers; joker++) {
        possibleHand = possibleHand.replace(wildcard, face);
        possibleCombinations.push(possibleHand);
      }
    });

    return possibleCombinations
      .map((possibleHand) => getHandValue(possibleHand))
      .sort()
      .at(-1);
  }
  return patterns.length - patternValue;
};

const sortHand = (a, b, faces = cardFaces) => {
  if (a.sortRank !== b.sortRank) return a.sortRank - b.sortRank;
  for (let index = 0; index < a.hand.length; index++) {
    if (a.hand[index] !== b.hand[index])
      return (
        faces.findIndex((i) => i === a.hand[index]) -
        faces.findIndex((i) => i === b.hand[index])
      );
  }
};

export const partA = (input) =>
  input
    .map((hand) => hand.split(" "))
    .map(([hand, bet]) => ({ hand, bet, sortRank: getHandValue(hand) }))
    .sort(sortHand)
    .map(({ bet }, index) => bet * (index + 1))
    .reduce(sum, 0);

export const partB = (input) =>
  input
    .map((hand) => hand.split(" "))
    .map(([hand, bet]) => ({ hand, bet, sortRank: getHandValue(hand, "J") }))
    .sort((a, b) => sortHand(a, b, joker))
    .map(({ bet }, index) => bet * (index + 1))
    .reduce(sum, 0);
