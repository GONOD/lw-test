import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useAuth } from '../auth/Auth';
import { Redirect } from 'react-router-dom';
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


export default function RegisterPage() {
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [login, setLogin] = useState('');
  const classes = useStyles();
  const auth = useAuth();
  let validation = true;

  if (password && password2 && password !== password2) {
    validation = false
  }

  // IN REDUX CONTEXT, USE REDUX-FORM TO AVOID THIS

  function handleChange(key: string, event: React.ChangeEvent<HTMLInputElement>) {
    if (key === 'login') {
      setLogin(event.target.value);
    } else if (key === 'password') {
      setPassword(event.target.value);
    } else {
      setPassword2(event.target.value);
    }
  }

  async function handleRegister() {
    auth.register({login, password});
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
      <div className={classes.title}>Create an account</div>
      <form className={classes.root} noValidate autoComplete="off">
        <div className={classes.form}>
            <TextField
              required
              id="login-required"
              label="Login"
              value={login}
              onChange={handleChange.bind(null, 'login')}
              variant="outlined"
            />
            <TextField
              required
              id="password-required"
              label="Password"
              type="password"
              onChange={handleChange.bind(null, 'password')}
              value={password}
              variant="outlined"
            />
            <TextField
              required
              error={!validation}
              id="password-required"
              label="Password validation"
              helperText="Password invalid"
              type="password"
              onChange={handleChange.bind(null, 'password2')}
              value={password2}
              variant="outlined"
          />
          </div>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleRegister}
            disabled={!password || !login || !password2 || !validation}
          >
            Login
          </Button>
        </form>
      </div>
  );
}
