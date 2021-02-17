import React, {ReactElement} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { ProvideAuth, useAuth } from './components/auth/Auth';
import GamePage from './components/game/GamePage';
import Header from './components/header/Header';
import LoginPage from './components/login/Login';
import RegisterPage from './components/register/Register';

export default function AuthExample() {
  return (
    <ProvideAuth>
      <Header/>
      <Router>
        <Switch>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <PrivateRoute path="/">
            <GamePage/>
          </PrivateRoute>
        </Switch>
      </Router>
    </ProvideAuth>
  );
}

interface PrivateRouteProps {
  children: ReactElement;
  path: string;
}

function PrivateRoute({children, ...rest }: PrivateRouteProps) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
