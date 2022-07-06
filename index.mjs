import invariant from "tiny-invariant";
import CardDeck from "./CardDeck.mjs";

const encrypt = ({ plainText, key }) => {
  invariant(plainText, "plainText is required");
  invariant(key, "key is required");
  const deck = new CardDeck({ key });

  // move the jokers
  const aJokerIndex = deck.cards.indexOf("a joker");
  deck.moveCardAtIndex(aJokerIndex, 1);
  const bJokerIndex = deck.cards.indexOf("b joker");
  deck.moveCardAtIndex(bJokerIndex, 2);

  // Perform a triple cut
  const aJIndex = deck.cards.indexOf("a joker");
  const bJIndex = deck.cards.indexOf("b joker");
  const firstJokerIndex = aJIndex < bJIndex ? aJIndex : bJIndex;
  const lastJokerIndex = aJIndex > bJIndex ? aJIndex : bJIndex;

  deck.performTripleCut(firstJokerIndex, lastJokerIndex);
};

const decrypt = ({ cypherText, key }) => {
  invariant(cypherText, "cypherText is required");
  invariant(key, "key is required");
  console.log("decrypt");
};

export { encrypt, decrypt };
