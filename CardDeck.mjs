class CardDeck {
  constructor({ key } = {}) {
    this.cardNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    this.suits = ["clubs", "diamonds", "hearts", "spades"];
    this.jokers = ["a", "b"];
    if (key) {
      this.cards = key;
    } else {
      this.cards = this.suits
        .reduce((acc, suit) => {
          return acc.concat(
            this.cardNumbers.map((number) => `${number} ${suit}`)
          );
        }, [])
        .concat(this.jokers.map((joker) => `${joker} joker`));
    }
  }

  shuffle() {
    let currentIndex = this.cards.length;
    let randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [this.cards[currentIndex], this.cards[randomIndex]] = [
        this.cards[randomIndex],
        this.cards[currentIndex],
      ];
    }
  }

  moveCardAtIndex(sourceIndex, numPlaces) {
    const placeholder = "------";
    const newOrder = [...this.cards];
    const cardToMove = newOrder.splice(sourceIndex, 1, placeholder)[0];
    const newIndex =
      this.cards.length - 1 < sourceIndex + numPlaces
        ? this.cards.length % (sourceIndex + numPlaces)
        : sourceIndex + numPlaces + 1;

    newOrder.splice(newIndex, 0, cardToMove);
    newOrder.splice(newOrder.indexOf(placeholder), 1);
    this.cards = newOrder;
  }

  performTripleCut(firstIndex, lastIndex) {
    const newOrder = [...this.cards];
    const firstCut = newOrder.slice(0, firstIndex);
    const secondCut = newOrder.slice(firstIndex, lastIndex + 1);
    const lastCut = newOrder.splice(lastIndex + 1, this.cards.length);
    this.cards = firstCut.concat(secondCut).concat(lastCut);
  }
}

export default CardDeck;
