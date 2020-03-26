import React from 'react';
import { Router } from 'react-router-dom';

import history from './services/history';
import Routes from './routes';

import GlobalStyles from './styles/globalStyles';

function App() {
  return (
    <div>
      <Router history={history}>
        <Routes />
      </Router>
      <GlobalStyles />
    </div>
  );
}

export default App;
