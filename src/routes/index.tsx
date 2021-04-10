import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './Home';
import NotFound from './NotFound';
import SignIn from './SignIn';
import HackitPage from './Hackit';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          component={SignIn}
        />
        <Route
          exact
          path="/home"
          component={Home}
        />
        <Route
          exact
          path="/h/:slug"
          component={HackitPage}
        />
        <Route
          exact
          component={NotFound}
        />
      </Switch>
    </Router>
  );
};

export default AppRouter;