import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

type Hackit = {
  name: string,
  description: string,
}

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
      const newHackit: Hackit = {
        name: newHackitName,
        description: newHackitDesc,
      };
      setHackits(oldHackits => [...oldHackits, newHackit]);
    }
    setNewHackitDesc('');
    setNewHackitName('');
  }

  const clickHackit = (hackit: Hackit) => {
    history.push(`/h/${hackit.name}`);
  }

  return (
    <div>
      <Typography variant="h2">
        Welcome to Hackit!
      </Typography>
      <div>
        <Typography variant="h4">
          Here is the current list of hackits:
        </Typography>
        {hackits.map((hackit) => {
          return(
            <Paper 
              key={hackit.name} 
              style={{padding: '20px', margin: '5px'}}
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
      </div>
      <div>
        <Typography variant="h4">
          Create a hackit?
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
          Create Hackit
        </Button>
      </div>
    </div>
  );
}

export default Home;