import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { MoralisProvider } from "react-moralis";
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import "./App.scss"

ReactDOM.render(
  <MoralisProvider appId="YupflW6FYYUNwqvZXD26h26Yx8vCAYQXFbwpJS0O" serverUrl="https://wo7vuwbpyk22.usemoralis.com:2053/server">
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </MoralisProvider>,
  document.getElementById('root')
);