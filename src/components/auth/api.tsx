import axios, { AxiosInstance } from 'axios';

export default class AuthAPI {
  readonly api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL,
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    });
  }

  signin = (params: {password: string; login: string;}) => {
    // return this.api.post('/login', null, {params});
    return {token: '123456789', refreshToken: 'r-123456789', user: {login: 'test@test.fr', name: 'Vincent'}};
  }

  signout = () => {
    // return this.api.post('/signout');
    return {message: 'OK'};
  }

  register = (params: {password: string; login: string;}) => {
    // return this.api.post('/register',null, {params});
    return {token: '123456789', refreshToken: 'r-123456789', user: {login: 'test@test.fr', name: 'Vincent'}};
  }
}
