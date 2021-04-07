import React, { useState } from 'react';

type Props = {
  setSignedIn: (b: boolean) => void,
}

const SignIn = (props: Props) => {
  const { setSignedIn } = props;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const changeUsername = (event: any) => {
    setUsername(event.target.value);
  }

  const changePassword = (event: any) => {
    setPassword(event.target.value);
  }

  const handleClick = (event: any) => {
    if (username && password) {
      setSignedIn(true);
    }
  }

  return (
    <div style={{'textAlign': 'left'}}>
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