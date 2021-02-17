import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useAuth } from '../auth/Auth';
import { Link, Redirect } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  page: {
    display: 'flex',
    flexDirection: 'column',
    padding: 24
  },
  title: {
    width: '100%',
    textAlign: 'center',
    fontSize: 35,
    padding: '24px 0'
  },
  form: {
    width: '100%',
    alignItems: 'center',
    display: 'flex',
    maxWidth: '900px',
    flexDirection: 'column',
    textAlign: 'center'
  },
  register: {
    width: '100%',
    textAlign: 'center',
    padding: '24px 0'
  }
}));


export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState('');
  const classes = useStyles();
  const auth = useAuth();

  function handleLogin(event: any) {
    setLogin(event.target.value);
  }

  function handlePassword(event: any) {
    setPassword(event.target.value);
  }

  async function handleSignin() {
    await auth.signin({login, password});
  }

  if (auth.user) {
    return (
      <Redirect
        to={{pathname: "/"}}
      />);
  }

  // USE REDUX FORM INSTEAD OF CUSTOM FORM IS BETTER, AND PRETTY SEXY

  return (
      <div className={classes.page}>
        <div className={classes.title}>LOGIN</div>
        <form className={classes.root} noValidate autoComplete="off">
          <div className={classes.form}>
            <TextField
              required
              id="login-required"
              label="Login"
              value={login}
              onChange={handleLogin}
              variant="outlined"
            />
            <TextField
              required
              id="password-required"
              label="Password"
              type="password"
              onChange={handlePassword}
              value={password}
              variant="outlined"

            />
          </div>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleSignin}
            disabled={!password || !login}
          >
            Login
          </Button>
        </form>
        <div className={classes.register}><Link to="/register">Create an account</Link></div>
      </div>
  );
}
