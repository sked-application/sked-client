import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import App from './app/app';

const history = createBrowserHistory();

ReactDOM.render(
    <Router location={history}>
        <App />
    </Router>,
    document.getElementById('root')
);
