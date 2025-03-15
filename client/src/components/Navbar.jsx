import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import './Navbar.css';
import CardapioButtonBranco from './CardapioButtonBranco';

function Navbar({ eventId, onShowAdicionarSaldo }) {
  const { user } = useContext(UserContext);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      console.error('No user logged in');
    }
  }, [user]);

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const toggleHamburgerMenu = () => {
    setIsHamburgerMenuOpen(!isHamburgerMenuOpen);
  };

  const handleCarteiraClick = () => {
    onShowAdicionarSaldo(user);
  };

  return (
    <nav className="navbar">
      <button className="hamburger-menu" onClick={toggleHamburgerMenu}>
        <div></div>
        <div></div>
        <div></div>
      </button>
      {isHamburgerMenuOpen && (
        <div className="hamburger-menu-content">
          <Link to="/events">Eventos</Link>
          <Link to="/comandas">Comandas</Link>
          <Link to="/carteira-virtual">Carteira Virtual</Link>
          <Link to="/cadastrar-eventos">Cadastrar Eventos</Link>
        </div>
      )}
      <ul>
        <li><Link to="/events">Eventos</Link></li>
        <li><Link to="/comandas">Comandas</Link></li>
        <li><Link to="/signup">Signup</Link></li>
      </ul>
      {eventId && <CardapioButtonBranco eventId={eventId} label="Cardápio" />}
      {user && (
        <div className="navbar-menu">
          <img
            src={user.photoURL}
            alt={user.displayName}
            className="navbar-user-photo"
            onClick={toggleUserMenu}
          />
          {isUserMenuOpen && (
            <div className="navbar-menu-content">
              <Link to="/perfil">Perfil</Link>
              <Link to="/adicionar-endereco">Adicionar Endereço</Link>
              <Link to="/adicionar-dados-bancarios">Adicionar Dados Bancários</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;