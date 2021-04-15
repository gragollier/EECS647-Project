import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './Home';
import NotFound from './NotFound';
import LogIn from './LogIn';
import SignUp from './SignUp';
import HackitPage from './Hackit';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          component={LogIn}
        />
        <Route
          exact
          path="/signup"
          component={SignUp}
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