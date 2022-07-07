# Cryptonomicon Solitaire Cypher in JS

Just finished reading Neal Stephenson's Cryptonomicon. It's a decent story
but I'm not sure I'd recommend it. It's freaking long.

Anyway, there's this manual crypto system in the story that the characters use
whereby they can encrypt and decrypt messages manually using a deck of cards.
In the story they call it the Pontifex cryptosystem.

I thought it was a pretty interesting idea.

At the end of the book, it turns out the dude who created the system has written
up pretty much a full [spec](spec.md) for the system, so I thought it might be fun
to implement the thing.

Turns out it wasn't that much fun, but here it is none-the-less.

## How it works

### Encryption

In the system, the key is a pack of cards (including jokers) shuffled in a particular order.

You pass this thing some plainText to encrypt, and the starting state for the pack of cards:

```
  const startDeck = [
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
    ]
  const plainText = "A TOP SECRET MESSAGE"

  const cypherText = Solitaire.encrypt({ plainText, key: startDeck });
  // GCCYYHZYHWPULXYEH

```

The cypherText can then be passed to someone who has a deck of cards suffled
in the same order (with the same _key_), and they can decrypt the thing

```
  const startDeck = [
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
    ]
  const cypherText = "GCCYYHZYHWPULXYEH"

  const plainText = Solitaire.decrypt({ cypherText, key: startDeck });
  //  "ATOPSECRETMESSAGE"
```
