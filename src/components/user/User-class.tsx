interface UserProps {
  login: string;
  name: string;
}


export default class User {
  readonly login: string;
  readonly name: string;

  constructor({login, name}: UserProps) {
    this.login = login;
    this.name = name;
  }
}