import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline } from '@nextui-org/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import App from './app';

const history = createBrowserHistory();

ReactDOM.render(
  <Router location={history}>
    <CssBaseline />
    <App />
  </Router>,
  document.getElementById('root'),
);
