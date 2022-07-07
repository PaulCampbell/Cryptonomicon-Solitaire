import { equal, notEqual, notDeepEqual } from "assert";
import CardDeck from "../CardDeck.mjs";
import * as Solitaire from "../index.mjs";

describe("Card deck", () => {
  it("should have 54 cards", () => {
    const deck = new CardDeck();
    equal(deck.cards.length, 54);
  });

  it("should shuffle cards", () => {
    const deck = new CardDeck();
    const defaultOrder = [...deck.cards];
    deck.shuffle();
    notEqual(defaultOrder, deck.cards);
  });

  it("should move specified card 1 place", () => {
    const deck = new CardDeck();
    const cardToMove = deck.cards[10];
    const cardIndex = deck.cards.indexOf(cardToMove);
    deck.moveCardAtIndex(cardIndex, 1);
    equal(deck.cards[11], cardToMove);
  });

  it("should move specified card 2 places", () => {
    const deck = new CardDeck();
    const cardToMove = deck.cards[10];
    const cardIndex = deck.cards.indexOf(cardToMove);
    deck.moveCardAtIndex(cardIndex, 2);
    equal(deck.cards[12], cardToMove);
  });

  it("should move card at end of deck back to beginning (treat array as circular)", () => {
    const deck = new CardDeck();
    const cardToMove = deck.cards[53];
    const cardIndex = deck.cards.indexOf(cardToMove);
    deck.moveCardAtIndex(cardIndex, 1);
    equal(deck.cards[0], cardToMove);
  });
});

describe("Solitaire", () => {
  const plainText = "DONOTUSEPC";
  const cypherText = "JXBXZXPLSF";
  const deck = new CardDeck({
    cardNamesInOrder: [
      "11 diamonds",
      "6 spades",
      "7 hearts",
      "13 clubs",
      "12 clubs",
      "9 spades",
      "12 hearts",
      "13 hearts",
      "5 spades",
      "10 spades",
      "3 hearts",
      "13 diamonds",
      "8 diamonds",
      "1 clubs",
      "6 diamonds",
      "6 clubs",
      "10 hearts",
      "8 spades",
      "7 diamonds",
      "5 hearts",
      "2 clubs",
      "6 hearts",
      "3 spades",
      "2 spades",
      "b joker",
      "7 spades",
      "1 diamonds",
      "11 hearts",
      "4 hearts",
      "4 diamonds",
      "4 spades",
      "11 spades",
      "1 spades",
      "12 diamonds",
      "5 clubs",
      "2 diamonds",
      "12 spades",
      "9 diamonds",
      "11 clubs",
      "4 clubs",
      "10 clubs",
      "8 hearts",
      "a joker",
      "8 clubs",
      "13 spades",
      "10 diamonds",
      "5 diamonds",
      "2 hearts",
      "3 diamonds",
      "9 hearts",
      "1 hearts",
      "9 clubs",
      "7 clubs",
      "3 clubs",
    ],
  });

  const key = deck.cards.map((c) => c.name);

  describe("encrypt", () => {
    it("should encrypt the plain text using a the key", () => {
      const encrypted = Solitaire.encrypt({ plainText, key });
      equal(encrypted, cypherText);
    });
  });

  describe("decrypt", () => {
    it("should decrypt the ciphertext using the key", () => {
      const decrypted = Solitaire.decrypt({ cypherText, key });
      equal(decrypted, plainText);
    });

    it("should fail to decrypt the ciphertext using incorrect key", () => {
      const badDeck = new CardDeck();
      badDeck.shuffle();

      const decrypted = Solitaire.decrypt({
        cypherText,
        key: badDeck.cards.map((c) => c.name),
      });

      notEqual(decrypted, plainText);
    });
  });
});
