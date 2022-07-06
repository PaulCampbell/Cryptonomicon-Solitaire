class CardDeck {
  constructor() {
    const cardNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    const suits = ["spades", "hearts", "diamonds", "clubs"];
    const jokers = ["a", "b"];

    this.cards = suits
      .reduce((acc, curr) => {
        return acc.concat(cardNumbers.map((suit) => `${curr} ${suit}`));
      }, [])
      .concat(jokers.map((joker) => `${joker} joker`));
  }

  shuffle() {
    let currentIndex = this.cards.length;
    let randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [this.cards[currentIndex], this.cards[randomIndex]] = [
        this.cards[randomIndex],
        this.cards[currentIndex],
      ];
    }
  }
}

export default CardDeck;
