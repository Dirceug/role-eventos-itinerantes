import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Usuarios from './pages/Usuarios';
import Servico from './pages/Servico';
import LoginComEmail from './pages/LoginComEmail';
import RegistrarUsuario from './pages/cadastro/RegistrarUsuario';
import AtualizarEndereco from './pages/cadastro/AtualizarEndereco';
import DadosBancarios from './pages/cadastro/DadosBancarios';
import ListaEventos from './components/ListaEventos';
import DetalheEvento from './components/DetalheEvento';
import { UserProvider } from './contexts/UserContext';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';

import './App.css';

function App() {
  return (
    <UserProvider>
      <Router>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/usuarios/*" element={<ProtectedRoute element={<Usuarios />} />} />
            <Route path="/servico/*" element={<ProtectedRoute element={<Servico />} />} />
            <Route path="/logincomemail" element={<LoginComEmail />} />
            <Route path="/cadastro/registrarusuario" element={<RegistrarUsuario />} />
            <Route path="/cadastro/atualizarendereco" element={<AtualizarEndereco />} />
            <Route path="/cadastro/dadosbancarios" element={<DadosBancarios />} />
            <Route path="/upcoming-events" element={<ListaEventos />} />
            <Route path="/event/:eventId/details" element={<DetalheEvento />} />
          </Routes>
        </ErrorBoundary>
      </Router>
    </UserProvider>
  );
}

export default App;