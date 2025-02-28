import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Eventos from '../components/usuarios/Eventos';
import Comandas from '../components/usuarios/Comandas';
import CarteiraVirtual from '../components/usuarios/CarteiraVirtual';
import Logout from '../components/Logout';

function Usuarios() {
  return (
    <div>
        <Eventos />
        <Logout />
      <nav>
        <Link to="eventos">Eventos</Link>
        <Link to="comandas">Comandas</Link>
        <Link to="carteira-virtual">Carteira Virtual</Link>
      </nav>
      <Routes>
        <Route path="eventos" element={<Eventos />} />
        <Route path="comandas" element={<Comandas />} />
        <Route path="carteira-virtual" element={<CarteiraVirtual />} />
      </Routes>
    </div>
  );
}

export default Usuarios;