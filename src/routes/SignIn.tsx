import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const api = 'https://1pyrtegry1.execute-api.us-east-1.amazonaws.com/prod';
const path = '/signin'

const SignIn = () => {
  const history = useHistory();

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
    <div>
      <h2>
        Sign In!
      </h2>
      <p>
        Username:
      </p>
      <input type="text" value={username} onChange={changeUsername} />
      <br />
      Username value -- {username}
      <p>
        Password:
      </p>
      <input type="password" value={password} onChange={changePassword} />
      <br />
      Password value -- {password}
      <br />
      <button onClick={handleClick}>
        Sign In
      </button>
    </div>
  )
};

export default SignIn;