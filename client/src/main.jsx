import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App';
import './main.css';
import { UserProvider } from './contexts/UserContext';

// Intercepta chamadas para window.open
const originalWindowOpen = window.open;

window.open = function (...args) {
  console.warn('Interceptado: uma tentativa de abrir uma janela foi feita com os seguintes argumentos:', args);
  return originalWindowOpen.apply(window, args);
};

// Intercepta chamadas para window.close
const originalWindowClose = window.close;

window.close = function () {
  console.warn('Interceptado: uma tentativa de fechar a janela foi feita.');
  try {
    // Chama a implementação original de window.close
    originalWindowClose.call(window);
  } catch (error) {
    console.error('Erro ao fechar a janela:', error);
  }
};

//console.log('Testando sessionStorage...');
try {
  sessionStorage.setItem('test', 'test');
  //console.log('sessionStorage está funcionando.');
} catch (error) {
  console.error('Erro no sessionStorage:', error);
}

//console.log('Testando localStorage...');
try {
  localStorage.setItem('test', 'test');
  //console.log('localStorage está funcionando.');
} catch (error) {
  console.error('Erro no localStorage:', error);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);