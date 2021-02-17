import React, {useContext, createContext, useState, useEffect} from 'react';
import User from '../user/User-class';
import AuthAPI from './api';

interface AuthObject {
  user: User | undefined;
  signin: Function;
  register: Function;
  signout: Function;
}

const authContext = createContext({} as AuthObject);

interface ProviderProps {
  children: React.ReactElement | React.ReactElement[];
}

export function ProvideAuth({children}: ProviderProps) {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}

function storeTokenAndUser(token: string, refreshToken:string, user: User) {
  localStorage.setItem('token', token);
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('user', JSON.stringify(user));
}

function useProvideAuth(): AuthObject {
  const [user, setUser] = useState<User>();
  const api = new AuthAPI();

  useEffect(() => {
    const stirngifiedUser = localStorage.getItem('user');

    if (stirngifiedUser) {
      setUser(JSON.parse(stirngifiedUser));
    }
  }, [])

  const signin = async (params: {login: string; password: string;}) => {
    const {token, refreshToken, user: newUser} = await api.signin(params); // CALL /me TO GET USER INFORMATION

    storeTokenAndUser(token, refreshToken, newUser);
    setUser(new User(newUser));
  };

  const register = async (params: {login: string; password: string;}) => {
    const {token, refreshToken, user: newUser} = await api.register(params); // AUTOMATICALLY AUTHENTICATED OR REDIRECT TO LOGIN PAGE

    storeTokenAndUser(token, refreshToken, newUser);
    setUser(new User(newUser));
  };

  const signout = async () => {
    await api.signout();

    setUser(undefined);
    localStorage.setItem('token', '');
    localStorage.setItem('refreshToken', '');
    localStorage.setItem('user', '');
  };

  return {
    user,
    signin,
    signout,
    register
  };
}
