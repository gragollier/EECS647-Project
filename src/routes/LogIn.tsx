import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

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

const LogIn = () => {
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
    localStorage.setItem("username", username);
    history.push('/home');
  }

  return (
    <Paper className={classes.root}>
      <Typography variant="h4">
        Log In!
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
      <Link to='/signup'>
        <Typography variant="subtitle1">
          Need an account? Sign Up!
        </Typography>
      </Link>
      <Button 
        variant="contained"
        color="primary"
        onClick={handleClick}
        className={classes.button}
      >
        Log In
      </Button>
    </Paper>
  )
};

export default LogIn;