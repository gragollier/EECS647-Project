import React, { useState } from 'react';
import './App.css';

import SignIn from './SignIn';
import Home from './Home';

function App() {
  const [signedIn, setSignedIn] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        {!signedIn ? (
          <SignIn setSignedIn={setSignedIn} />
        ) : (
          <Home />
        )}
      </header>
    </div>
  );
}

export default App;
