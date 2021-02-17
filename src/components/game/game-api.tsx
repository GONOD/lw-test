import axios from 'axios';

const MOCK_CARDS = [
  [{symbol: 'A'}, {symbol: 'B'}, {symbol: 'C'}, {symbol: 'D'}],
  [{symbol: 'E'}, {symbol: 'F'}, {symbol: 'G'}, {symbol: 'H'}],
  [{symbol: 'A'}, {symbol: 'B'}, {symbol: 'C'}, {symbol: 'D'}],
  [{symbol: 'E'}, {symbol: 'F'}, {symbol: 'G'}, {symbol: 'H'}]
]

export default class GameAPI {
  readonly api: any;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL,
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
  }

  newGame = () => {
    // return this.api.post('/cards', q={size: 4}, getHeaders());
    return {
      cards: MOCK_CARDS
    };
  }

  stopGame = (score: number) => {
    // return this.api.post('/scores', {score}, getHeaders());
    return {message: 'OK'};
  }

}
