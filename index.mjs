import invariant from "tiny-invariant";
import CardDeck from "./CardDeck.mjs";

const findWithAttr = (array, attr, value) => {
  for (var i = 0; i < array.length; i += 1) {
    console.log(array[i], attr, value);
    if (array[i][attr] === value) {
      return i;
    }
  }
  return -1;
};

const encrypt = ({ plainText, key }) => {
  invariant(plainText, "plainText is required");
  invariant(key, "key is required");
  const deck = new CardDeck({ cardNamesInOrder: key });

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
};

const decrypt = ({ cypherText, key }) => {
  invariant(cypherText, "cypherText is required");
  invariant(key, "key is required");
  console.log("decrypt");
};

export { encrypt, decrypt };
