import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Usuarios from './pages/Usuarios';
import Servico from './pages/Servico';
import LoginComEmail from './pages/LoginComEmail';
import RegistrarUsuario from './pages/cadastro/RegistrarUsuario';
import AtualizarEndereco from './pages/cadastro/AtualizarEndereco';
import DadosBancarios from './pages/cadastro/DadosBancarios';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/usuarios/*" element={<Usuarios />} />
        <Route path="/servico/*" element={<Servico />} />
        <Route path="/logincomemail" element={<LoginComEmail />} />
        <Route path="/cadastro/registrarusuario" element={<RegistrarUsuario />} />
        <Route path="/cadastro/atualizarendereco" element={<AtualizarEndereco />} />
        <Route path="/cadastro/dadosbancarios" element={<DadosBancarios />} />
      </Routes>
    </Router>
  );
}

export default App;