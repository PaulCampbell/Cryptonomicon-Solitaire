import { equal, notEqual, notDeepEqual } from "assert";
import CardDeck from "../CardDeck.mjs";

describe("Card deck", () => {
  const deck = new CardDeck();
  it("should have 54 cards", () => {
    equal(deck.cards.length, 54);
  });

  it("should shuffle cards", () => {
    const defaultOrder = [...deck.cards];
    deck.shuffle();
    notEqual(defaultOrder, deck.cards);
  });
});

xdescribe("Solitaire", () => {
  const plainText = "DO NOT USE PC";
  const cypherText = "OSKJJ JGTMW";

  describe("encrypt", () => {
    it("should encrypt the plain text using a the key", () => {
      const s = new Solitaire({ plainText, key: "12345678" });
      equal(s.encrypt(), "Hello World");
    });
  });

  describe("decrypt", () => {
    it("should decrypt the ciphertext using the key", () => {
      const s = new Solitaire({ cypherText: "Hello World", key: "12345678" });
      equal(s.decrypt(), "Hello World");
    });

    it("should fail to decrypt the ciphertext using incorrect key", () => {
      const s = new Solitaire({ cypherText: "Hello World", key: "12345678" });
      notEqual(s.decrypt(), "Hello World");
    });
  });
});
