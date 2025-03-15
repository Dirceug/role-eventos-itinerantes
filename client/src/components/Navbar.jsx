import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import { getAuth, signOut } from 'firebase/auth'; // Importar signOut para logout
import Cookies from 'js-cookie';
import './Navbar.css';
import CardapioButtonBranco from './buttons/CardapioButtonBranco';

function Navbar({ eventId, onShowAdicionarSaldo }) {
  const { user } = useContext(UserContext);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

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

  const handleLogout = async (e) => {
    e.preventDefault();
    const confirmation = window.confirm("Deseja mesmo sair da plataforma?");
    if (confirmation) {
      alert("Gostei de você, volte sempre 😉");
      try {
        await signOut(auth);
        Cookies.remove('authToken'); // Remover o token dos cookies
        navigate('/login');
      } catch (error) {
        console.error('Erro ao fazer logout:', error);
      }
    } else {
      alert("Que bom, pode continuar a navegação ❤️");
    }
  };

  const handleCardapioClick = () => {
    navigate('/lista-barracas', { state: { eventId, userId: user ? user.uid : null } });
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
          <a href="/logout" onClick={handleLogout}>Logout</a> {/* Acionando a função handleLogout */}
        </div>
      )}
      {eventId && (
        <CardapioButtonBranco
          eventId={eventId}
          userId={user ? user.uid : null} // Enviar userId se disponível
          label="Cardápio"
          onClick={handleCardapioClick} // Adicionar onClick para redirecionar para ListaBarracas
        />
      )}
      {user && (
        <div className="navbar-menu">
          <img
            src={user.photoURL}
            alt={user.displayName}
            className="navbar-user-photo"
            onClick={toggleUserMenu}
          />
          {isUserMenuOpen && (
            <div className="navbar-menu-content" onClick={(e) => e.stopPropagation()}>
              <Link to="/perfil">Perfil</Link>
              <Link to="/adicionar-endereco">Adicionar Endereço</Link>
              <Link to="/adicionar-dados-bancarios">Adicionar Dados Bancários</Link>
              <a href="/logout" onClick={handleLogout}>Logout</a> {/* Acionando a função handleLogout */}
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;