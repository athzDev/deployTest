import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './fonts/fonts.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';


ReactDOM.render(
  <BrowserRouter>
      <App />
  </BrowserRouter>,
  document.getElementById('root')
);
reportWebVitals();