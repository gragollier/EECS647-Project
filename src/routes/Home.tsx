import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { apiUrl } from '../config';

type Hackit = {
  name: string,
  description: string,
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    textField: {
      margin: theme.spacing(1),
    },
    button: {
      margin: theme.spacing(1),
      width: '25ch',
      textAlign: 'center',
    },
    divider: {
      margin: theme.spacing(3),
    },
    paper: {
      padding: '20px',
      margin: '5px',
    }
  }),
);

const listPath = "/listsubhackits";
const path = '/createsubhackit';

const Home = () => {
  const history = useHistory();
  const classes = useStyles();
  
  const [hackits, setHackits] = useState<Hackit[]>([]);
  const [hackitsLoaded, setHackitsLoaded] = useState<boolean>(false);

  const [newHackitName, setNewHackitName] = useState('');
  const [newHackitDesc, setNewHackitDesc] = useState('');

  const changeNewHackitName = (event: any) => {
    setNewHackitName(event.target.value);
  }

  const changeNewHackitDesc = (event: any) => {
    setNewHackitDesc(event.target.value);
  }

  const createNewHackit = (event: any) => {
    if (newHackitName && newHackitDesc) {
      const request = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ 
          name: newHackitName,
          description: newHackitDesc,
        }),
      };

      fetch(apiUrl+path, request)
        .then(response => response.json())
        .then(() => {
          setHackitsLoaded(false);
        })
      //setHackits(oldHackits => [...oldHackits, newHackit]);
    }
    setNewHackitDesc('');
    setNewHackitName('');
  }

  useEffect(() => {
    if (!hackitsLoaded) {
      fetch(apiUrl + listPath)
      .then(res => res.json())
      .then(hackits => {
        setHackits(hackits);
        setHackitsLoaded(true);
      });
    }
  });

  const clickHackit = (hackit: Hackit) => {
    history.push(`/h/${hackit.name}`);
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h2">
        Welcome to Hackit!
      </Typography>
      <Container>
        <Typography variant="h4">
          Go to a hackit:
        </Typography>
        {hackits.map((hackit) => {
          return(
            <Paper 
              key={hackit.name} 
              className={classes.paper}
              onClick={() => clickHackit(hackit)}
            >
              <Typography variant="h5">
                {hackit.name}
              </Typography>
              <Typography variant="body1">
                {hackit.description}
              </Typography>
            </Paper>
          );
        })}
      </Container>
      <Divider className={classes.divider} />
      <Container className={classes.root} maxWidth="xs">
        <Typography variant="h4">
          Create a hackit?
        </Typography>
        <TextField
          variant="outlined"
          label="Name"
          required
          value={newHackitName}
          onChange={changeNewHackitName}
          className={classes.textField}
          fullWidth
        />
        <TextField
          variant="outlined"
          label="Description"
          multiline
          required
          value={newHackitDesc}
          onChange={changeNewHackitDesc}
          className={classes.textField}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={createNewHackit}
          className={classes.button}
        >
          Create Hackit
        </Button>
      </Container>
    </Container>
  );
}

export default Home;