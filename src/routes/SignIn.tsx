import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const api = 'https://1pyrtegry1.execute-api.us-east-1.amazonaws.com/prod';
const path = '/signin'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(4),
    },
    textField: {
      margin: theme.spacing(1),
      width: '25ch',
    },
    button: {
      margin: theme.spacing(1),
      width: '25ch',
      textAlign: 'center',
    },
  }),
);

const SignIn = () => {
  const history = useHistory();
  const classes = useStyles();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const changeUsername = (event: any) => {
    setUsername(event.target.value);
  }

  const changePassword = (event: any) => {
    setPassword(event.target.value);
  }

  const handleClick = (event: any) => {
    const request = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ 
        username: username, 
        password: password,
      }),
    };

    console.log(request);

    fetch(api + path, request)
      .then(response => response.json())
      .then(data => {
        if (data.signedIn) {
          history.push('/home');
        }
      });
  }

  return (
    <Paper className={classes.root}>
      <Typography variant="h5">
        Sign In!
      </Typography>
      <TextField 
        variant="outlined" 
        label="Username"
        required
        value={username} 
        onChange={changeUsername} 
        className={classes.textField}
        fullWidth
      />
      <TextField 
        variant="outlined" 
        label="Password"
        required
        value={password} 
        onChange={changePassword} 
        className={classes.textField}
        fullWidth
      />
      <Button 
        variant="contained"
        color="primary"
        onClick={handleClick}
        className={classes.button}
      >
        Sign In
      </Button>
    </Paper>
  )
};

export default SignIn;