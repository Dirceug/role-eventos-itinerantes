import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Eventos from '../components/usuarios/Eventos';
import Comandas from '../components/usuarios/Comandas';
import CarteiraVirtual from '../components/usuarios/CarteiraVirtual';
import Logout from '../components/Logout';
import Navbar from '../components/layout/Navbar'
import ListaEventos from '../pages/ListaEventos'



function Usuarios() {
  return (
    <div>
      <ListaEventos />
    </div>
  );
}

export default Usuarios;