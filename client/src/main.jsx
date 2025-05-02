import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App';
import './main.css';
import { UserProvider } from './contexts/UserContext';

// Sobrescreve window.closed e window.close no ambiente de produção
if (import.meta.env.PROD) {
  // Sobrescreve window.closed para evitar acessos bloqueados
  Object.defineProperty(window, 'closed', {
    get: () => {
      console.warn('window.closed foi acessado, mas está bloqueado no ambiente de produção.');
      return false; // Retorna false para evitar problemas
    }
  });

  // Sobrescreve window.close para evitar chamadas bloqueadas
  window.close = () => {
    console.warn('window.close foi chamado, mas está bloqueado no ambiente de produção.');
  };
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);