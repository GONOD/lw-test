import _ from 'lodash';
import Card from '../../card/class/card';
import moment, { Moment } from 'moment';
import GameAPI from '../game-api';

function formatCards(lines: any) {
  const board: Card[][] = [];

  for (let index = 0; index < lines.length; index++) {
    for (const card of lines[index]) {
      board[index] = board[index] || [];
      board[index].push(new Card(card.symbol));
    }
  }

  return board;
}

export default class Game {
  readonly board: Card[][];
  history: Card[][];
  start: Moment;
  end: Moment;
  api: GameAPI;

  constructor(api: GameAPI, cards: any) {
    this.board = formatCards(cards);
    this.start = moment();
    this.end =  moment();
    this.history = [];
    this.api = api;
  }

  reset() {
    for (const line of this.board) {
      for (const card of line) {
        card.value = "";
      }
    }

    this.startGame();
    this.history = [];
  }

  startGame() {
    this.start = moment(new Date());
  }

  endGame() {
    this.end = moment(new Date());
    this.api.stopGame(this.end.diff(this.start));
  }

  setHistory(history: Card[][]) {
    this.history = history;
  }

  getHistory() {
    return [...this.history];
  }

  getBoard() {
    return [...this.board];
  }

  isFinished() {
    return !_.some(this.board, line => _.some(line, c => !c.value))
  }

  time() {
    return this.end.diff(this.start, 'seconds');
  }

  addToHistory(card: Card) {
    const last = this.history[this.history.length - 1];

    if (!last || last.length === 2) {
      this.history.push([card]);
    } else {
      last.push(card);
    }
  }

  getPlayTurn() {
    const last = this.history[this.history.length - 1];
    return {
      turn: !last || last.length === 2 ? 1 : 2,
      previousCard: last && last[0]
    };
  }

  undo() {
    const last = this.history[this.history.length - 1];

    if (!last) {
      return;
    }

    if (last.length === 1) {
      last[0].flip();
    } else if (!last[0].value) {
      last[0].flip();

      last.pop();
    }
  }
}