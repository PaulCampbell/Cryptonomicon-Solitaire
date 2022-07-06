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
  const plainText = "DO NOT USE PC";
  const cypherText = "OSKJJ JGTMW";
  const deck = new CardDeck({});
  deck.shuffle();
  const key = deck.cards;

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
        cypherText: "Hello World",
        key: badDeck.cards,
      });

      notEqual(decrypted, plainText);
    });
  });
});
