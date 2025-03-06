import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App';
import './main.css';  // Importa o arquivo CSS principal
import { UserProvider } from './contexts/UserContext';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);