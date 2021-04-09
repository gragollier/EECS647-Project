import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

type Hackit = {
  Name: string,
  Description: string,
}

const api = 'https://1pyrtegry1.execute-api.us-east-1.amazonaws.com/prod';
const path = '/createsubhackit';

const Home = () => {
  const history = useHistory();
  
  const [hackits, setHackits] = useState<Hackit[]>([]);

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
          Name: newHackitName,
          Description: newHackitDesc,
        }),
      };

      fetch(api+path, request)
        .then(response => response.json())
        .then(data => {
          setHackits(data.Subhackits);
        })
      //setHackits(oldHackits => [...oldHackits, newHackit]);
    }
    setNewHackitDesc('');
    setNewHackitName('');
  }

  const clickSubhackit = (hackit: Hackit) => {
    history.push(`/h/${hackit.Name}`);
  }

  return (
    <div>
      <Typography variant="h2">
        Welcome to Hackit!
      </Typography>
      <div>
        <Typography variant="h4">
          Here is the current list of subhackits:
        </Typography>
        {hackits.map((hackit) => {
          return(
            <Paper 
              key={hackit.Name} 
              style={{padding: '20px', margin: '5px'}}
              onClick={() => clickSubhackit(hackit)}
            >
              <Typography variant="h5">
                {hackit.Name}
              </Typography>
              <Typography variant="body1">
                {hackit.Description}
              </Typography>
            </Paper>
          );
        })}
      </div>
      <div style={{textAlign: 'left'}}>
        <Typography variant="h4">
          Create a subhackit?
        </Typography>
        <Typography variant="body1">
          Name:
        </Typography>
        <TextField variant="outlined" value={newHackitName} onChange={changeNewHackitName} />
        <Typography variant="body1">
          Description:
        </Typography>
        <TextField variant="outlined" value={newHackitDesc} onChange={changeNewHackitDesc} />
        <br />
        <Button variant="contained" color="primary" onClick={createNewHackit}>
          Create Subhackit
        </Button>
      </div>
    </div>
  );
}

export default Home;