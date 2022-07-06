import CardDeck from "./CardDeck.mjs";

const deck = new CardDeck();
deck.shuffle();
console.log(deck.cards.length);
console.log(deck.cards);
