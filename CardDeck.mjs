class CardDeck {
  constructor({ cardNamesInOrder } = {}) {
    this.cardNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    this.suits = ["clubs", "diamonds", "hearts", "spades"];
    this.jokers = ["a", "b"];
    if (cardNamesInOrder) {
      this.cards = this._constructCards(cardNamesInOrder);
    } else {
      this.cards = this._freshDeck();
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

  _freshDeck() {
    return this.suits
      .reduce((acc, suit) => {
        return acc.concat(
          this.cardNumbers.map((number) => {
            return {
              value: this._getCardValue(suit, number),
              name: `${number} ${suit}`,
            };
          })
        );
      }, [])
      .concat(
        this.jokers.map((joker) => {
          return {
            value: 53,
            name: `${joker} joker`,
          };
        })
      );
  }

  _constructCards(cardNamesInOrder) {
    return cardNamesInOrder.map((name) => {
      const [number, suit] = name.split(" ");
      if (suit === "joker") {
        return {
          value: 53,
          name,
        };
      } else {
        return {
          name,
          value: this._getCardValue(suit, number),
        };
      }
    });
  }
  _getCardValue(suit, number) {
    switch (suit) {
      case "clubs":
        return number;
      case "diamonds":
        return number + 13;
      case "hearts":
        return number + 26;
      case "spades":
        return number + 39;
    }
  }
}

export default CardDeck;
