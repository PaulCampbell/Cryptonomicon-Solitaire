import invariant from "tiny-invariant";
import CardDeck from "./CardDeck.mjs";

const findWithAttr = (array, attr, value) => {
  for (var i = 0; i < array.length; i += 1) {
    if (array[i][attr] === value) {
      return i;
    }
  }
  return -1;
};

const letters = [
  "",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const generateKeyStreamChar = (deck) => {
  // move the jokers
  const aJokerIndex = findWithAttr(deck.cards, "name", "a joker");
  deck.moveCardAtIndex(aJokerIndex, 1);
  const bJokerIndex = findWithAttr(deck.cards, "name", "b joker");
  deck.moveCardAtIndex(bJokerIndex, 2);

  // Perform a triple cut
  const aJIndex = findWithAttr(deck.cards, "name", "a joker");
  const bJIndex = findWithAttr(deck.cards, "name", "b joker");
  const firstJokerIndex = aJIndex < bJIndex ? aJIndex : bJIndex;
  const lastJokerIndex = aJIndex > bJIndex ? aJIndex : bJIndex;

  deck.performTripleCut(firstJokerIndex, lastJokerIndex);

  // Perform a count cut
  deck.performCountCut(deck.cards[deck.cards.length - 1].value);
  const value = deck.cards[deck.cards[0].value - 1].value;
  return value > 26 ? value - 26 : value;
};

const encrypt = ({ plainText, key }) => {
  invariant(plainText, "plainText is required");
  invariant(key, "key is required");
  const deck = new CardDeck({ cardNamesInOrder: key });
  const keyStreamChars = [];
  const plainTextNoSpace = plainText.replace(/\s/g, "");
  for (let i = 0; i < plainTextNoSpace.length; i += 1) {
    keyStreamChars.push(generateKeyStreamChar(deck));
  }
  const plainTextAsNumbers = plainTextNoSpace.split("").map((char) => {
    return letters.indexOf(char.toLowerCase());
  });
  const keystreamPlusPlainText = plainTextAsNumbers.map((num, i) => {
    const s = num + keyStreamChars[i];
    return s > 26 ? s - 26 : s;
  });
  return keystreamPlusPlainText
    .map((num) => letters[num])
    .join("")
    .toUpperCase();
};

const decrypt = ({ cypherText, key }) => {
  invariant(cypherText, "cypherText is required");
  invariant(key, "key is required");

  const deck = new CardDeck({ cardNamesInOrder: key });
  const keyStreamChars = [];
  const cypherTextNoSpace = cypherText.replace(/\s/g, "");
  for (let i = 0; i < cypherTextNoSpace.length; i += 1) {
    keyStreamChars.push(generateKeyStreamChar(deck));
  }

  const cypherTextAsNumbers = cypherTextNoSpace.split("").map((char) => {
    return letters.indexOf(char.toLowerCase());
  });

  const cypherMinusKeyStream = cypherTextAsNumbers.map((num, i) => {
    return num <= keyStreamChars[i]
      ? num + 26 - keyStreamChars[i]
      : num - keyStreamChars[i];
  });

  return cypherMinusKeyStream
    .map((num) => letters[num])
    .join("")
    .toUpperCase();
};

export { encrypt, decrypt };
