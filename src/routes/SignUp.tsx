import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { apiUrl } from '../config';
const path = '/createuser'

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

const SignUp = () => {
  const history = useHistory();
  const classes = useStyles();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');

  const changeUsername = (event: any) => {
    setUsername(event.target.value);
  }

  const changePassword = (event: any) => {
    setPassword(event.target.value);
  }

  const changeBio = (event: any) => {
    setBio(event.target.value);
  }

  const handleClick = (event: any) => {
    const request = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ 
        username: username,
        bio: bio,
      }),
    };

    console.log(request);

    fetch(apiUrl + path, request)
      .then(response => response.json())
      .then(() => {
        localStorage.setItem("username", username);
        history.push('/home');
      });
  }

  return (
    <Paper className={classes.root}>
      <Typography variant="h4">
        Sign Up!
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
        type="password"
        variant="outlined" 
        label="Password"
        required
        value={password} 
        onChange={changePassword} 
        className={classes.textField}
        fullWidth
      />
      <TextField 
        variant="outlined" 
        label="A Short Biography"
        value={bio} 
        onChange={changeBio} 
        className={classes.textField}
        fullWidth
      />
      <Link to='/'>
        <Typography variant="subtitle1">
          Already have an account? Log In!
        </Typography>
      </Link>
      <Button 
        variant="contained"
        color="primary"
        onClick={handleClick}
        className={classes.button}
      >
        Sign Up
      </Button>
    </Paper>
  )
};

export default SignUp;