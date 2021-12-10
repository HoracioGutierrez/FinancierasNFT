import React from 'react';
import ReactDOM from 'react-dom';
import App from './ui/layout/App';
import "./estilos.scss"
import { MoralisProvider } from "react-moralis"
import { BrowserRouter } from "react-router-dom"

ReactDOM.render(
  <BrowserRouter>
    <MoralisProvider
      appId="UBLBJztkt7wqWAiPaHmaTfZs5Kj8CoZs9wNn6erg"
      serverUrl="https://ezdnxz4vljsr.usemoralis.com:2053/server">
      <App />
    </MoralisProvider>
  </BrowserRouter>,
  document.getElementById('root')
);