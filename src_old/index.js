import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MoralisProvider } from "react-moralis";
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <MoralisProvider appId="YupflW6FYYUNwqvZXD26h26Yx8vCAYQXFbwpJS0O" serverUrl="https://wo7vuwbpyk22.usemoralis.com:2053/server">
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  </MoralisProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
