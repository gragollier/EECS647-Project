import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

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
  }

  const clickSubhackit = (hackit: Hackit) => {
    history.push(`/h/${hackit.name}`);
  }

  return (
    <div>
      <h2>
        Welcome to Hackit!
      </h2>
      <div>
        <h4>
          Here is the current list of subhackits:
        </h4>
        {hackits.map((hackit) => {
          return(
            <div 
              key={hackit.name} 
              style={{backgroundColor: 'darkgreen'}}
              onClick={() => clickSubhackit(hackit)}
            >
              <h5>
                {hackit.name}
              </h5>
              <p>
                {hackit.description}
              </p>
            </div>
          );
        })}
      </div>
      <div style={{textAlign: 'left'}}>
        <h4>
          Create a subhackit?
        </h4>
        <p>
          Name:
        </p>
        <input type="text" value={newHackitName} onChange={changeNewHackitName} />
        <p>
          Description:
        </p>
        <input type="text" value={newHackitDesc} onChange={changeNewHackitDesc} />
        <br />
        <button onClick={createNewHackit}>
          Create Subhackit
        </button>
      </div>
    </div>
  );
}

export default Home;