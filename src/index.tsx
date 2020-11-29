import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './index.scss';

import App from './App';
import reportWebVitals from './reportWebVitals';

const dasguriasRoot = document.getElementById('dasgurias');

ReactDOM.render(
  <React.StrictMode>
    <header role="header" className="header">
      <nav role="navigation">
        <a href="#" onClick={(e) => { window.alert('The page is only available in brazillian portuguese for now!'); e.preventDefault(); }}>🇧🇷 &nbsp; PT</a>
      </nav>
    </header>

    <Router>
      <Route path="/" component={App} />
    </Router>

    <footer role="footer" className="footer">
      © DasGurias - Doces Brasileiros Saudáveis - ,2020
    </footer>
  </React.StrictMode>,
  dasguriasRoot,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
