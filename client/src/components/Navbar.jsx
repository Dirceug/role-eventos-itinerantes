import React, { useContext, useEffect, useState, lazy, Suspense } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import { getAuth, signOut } from 'firebase/auth';
import Cookies from 'js-cookie';
import './Navbar.css';

const CardapioButtonBranco = lazy(() => import('./buttons/CardapioButtonBranco'));
const SaldoButtonBranco = lazy(() => import('./buttons/SaldoButtonBranco'));

function Navbar({ eventId }) {
  const { user, loadingUser } = useContext(UserContext);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    if (!user) {
      console.error('No user logged in');
    } else {
      console.log('User ID in Navbar:', user._id);
    }
  }, [user]);

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const toggleHamburgerMenu = () => {
    setIsHamburgerMenuOpen(!isHamburgerMenuOpen);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    const confirmation = window.confirm("Deseja mesmo sair da plataforma?");
    if (confirmation) {
      alert("Gostei de você, volte sempre 😉");
      try {
        await signOut(auth);
        Cookies.remove('authToken');
        navigate('/login');
      } catch (error) {
        console.error('Erro ao fazer logout:', error);
      }
    } else {
      alert("Que bom, pode continuar a navegação ❤️");
    }
  };

  const userToken = Cookies.get('authToken');

  if (loadingUser) {
    return <div>Carregando...</div>;
  }

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
          <a href="/logout" onClick={handleLogout}>Logout</a>
        </div>
      )}
      <Suspense fallback={<div>Carregando...</div>}>
        {user && eventId && (
          <CardapioButtonBranco
            eventId={eventId}
            userId={user ? user._id : null}
            label="Cardápio"
          />
        )}
        {user && (
          <SaldoButtonBranco
            userId={user._id}
            token={userToken}
            label="Adicionar Saldo"
          />
        )}
      </Suspense>
      {user && (
        <div className="navbar-menu">
          <img
            src={user.photoURL}
            alt={user.displayName}
            className="navbar-user-photo"
            onClick={toggleUserMenu}
          />
          <p>{user.displayName}</p>
          {isUserMenuOpen && (
            <div className="navbar-menu-content" onClick={(e) => e.stopPropagation()}>
              <Link to="/perfil">Perfil</Link>
              <Link to="/adicionar-endereco">Adicionar Endereço</Link>
              <Link to="/adicionar-dados-bancários">Adicionar Dados Bancários</Link>
              <a href="/logout" onClick={handleLogout}>Logout</a>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;