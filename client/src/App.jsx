import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
import { ToastContainer } from 'react-toastify';
import './App.css';

const Login = lazy(() => import('./pages/Login'));
const Usuarios = lazy(() => import('./pages/Usuarios'));
const Servico = lazy(() => import('./pages/Servico'));
const LoginComEmail = lazy(() => import('./pages/LoginComEmail'));
const RegistrarUsuario = lazy(() => import('./pages/cadastro/RegistrarUsuario'));
const AtualizarEndereco = lazy(() => import('./pages/cadastro/AtualizarEndereco'));
const DadosBancarios = lazy(() => import('./pages/cadastro/DadosBancarios'));
const ListaEventos = lazy(() => import('./pages/ListaEventos'));
const DetalheEvento = lazy(() => import('./pages/DetalheEvento'));
const ListaBarracas = lazy(() => import('./pages/ListaBarracas'));
const DetalheCardapio = lazy(() => import('./pages/DetalheCardapio'));
const ListaPedidos = lazy(() => import('../src/pages/ListaPedidos')); 
const CriarEventos = lazy(() => import('./pages/CriarEventos'));

function App() {
  const [showAdicionarSaldo, setShowAdicionarSaldo] = useState(false);
  const [user, setUser] = useState(null);

  const handleShowAdicionarSaldo = (user) => {
    setUser(user);
    setShowAdicionarSaldo(true);
  };

  const handleCloseAdicionarSaldo = () => {
    setShowAdicionarSaldo(false);
  };

  return (
    <UserProvider>
      <Router>
        <ErrorBoundary>
          <Suspense fallback={<div>Carregando...</div>}>
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
              <Route path="/lista-barracas" element={<ProtectedRoute element={<ListaBarracas />} />} />
              <Route path="/lista-pedidos" element={<ProtectedRoute element={<ListaPedidos />} />} />
              <Route path="/eventos/novo" element={<ProtectedRoute element={<CriarEventos />} />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
        <ToastContainer />
      </Router>
    </UserProvider>
  );
}

export default App;