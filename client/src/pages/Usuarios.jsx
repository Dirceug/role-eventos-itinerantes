import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Eventos from '../components/usuarios/Eventos';
import Comandas from '../components/usuarios/Comandas';
import CarteiraVirtual from '../components/usuarios/CarteiraVirtual';

function Usuarios() {
  return (
    <div>
        <Eventos />
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