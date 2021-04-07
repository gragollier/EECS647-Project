import React, { useState } from 'react';
import './App.css';

import SignIn from './SignIn';

function App() {
  const [signedIn, setSignedIn] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        {!signedIn ? (
          <SignIn setSignedIn={setSignedIn} />
        ) : (
          <p>
            You're signed in!
          </p>
        )}
      </header>
    </div>
  );
}

export default App;
