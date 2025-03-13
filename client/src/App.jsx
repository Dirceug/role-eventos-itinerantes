import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';

import Login from './pages/Login';
import Usuarios from './pages/Usuarios';
import Servico from './pages/Servico';
import LoginComEmail from './pages/LoginComEmail';
import RegistrarUsuario from './pages/cadastro/RegistrarUsuario';
import AtualizarEndereco from './pages/cadastro/AtualizarEndereco';
import DadosBancarios from './pages/cadastro/DadosBancarios';
import ListaEventos from './components/ListaEventos';
import DetalheEvento from './components/DetalheEvento';
import ListaBarracas from './components/ListaBarracas';
import DetalheCardapio from './components/DetalheCardapio';

import './App.css';

function App() {
  return (
    <UserProvider>
      <Router>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logincomemail" element={<LoginComEmail />} />
            <Route path="/usuarios/*" element={<ProtectedRoute element={<Usuarios />} />} />
            <Route path="/servico/*" element={<ProtectedRoute element={<Servico />} />} />
            <Route path="/cadastro/registrarusuario" element={<ProtectedRoute element={<RegistrarUsuario />} />} />
            <Route path="/cadastro/atualizarendereco" element={<ProtectedRoute element={<AtualizarEndereco />} />} />
            <Route path="/cadastro/dadosbancarios" element={<ProtectedRoute element={<DadosBancarios />} />} />
            <Route path="/upcoming-events" element={<ProtectedRoute element={<ListaEventos />} />} />
            <Route path="/event/:eventId/details" element={<ProtectedRoute element={<DetalheEvento />} />} />
            <Route path="/event/:eventId/barracas" element={<ProtectedRoute element={<ListaBarracas />} />} />
            <Route path="/event/:eventId/barraca/:barracaId/cardapio" element={<ProtectedRoute element={<DetalheCardapio />} />} />
          </Routes>
        </ErrorBoundary>
      </Router>
    </UserProvider>
  );
}

export default App;