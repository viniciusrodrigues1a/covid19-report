import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/Main';

export default function () {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" component={Main} />
        <Route path="/:country" component={Main} />
      </Switch>
    </HashRouter>
  );
}
