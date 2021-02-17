export default class Card {
  readonly symbol: string;
  value: string;

  constructor(symbol: string) {
    this.symbol = symbol;
    this.value = '';
  }

  flip() {
    this.value = this.value ? '' : this.symbol;

    return this.value;
  }
}