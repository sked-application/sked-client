import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import App from './app';

const history = createBrowserHistory();
const root = createRoot(document.getElementById('root'));

root.render(
  <Router location={history}>
    <App />
  </Router>,
);
