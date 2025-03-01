import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import './LoginComponent.css';

function Logout() {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = async () => {
    const confirmation = window.confirm("Deseja mesmo sair da plataforma?");
    if (confirmation) {
      alert("Gostei de você, volte sempre 😉");
      try {
        await signOut(auth);
        navigate('/login');
      } catch (error) {
        console.error('Erro ao fazer logout:', error);
      }
    } else {
      alert("Que bom, pode continuar a navegação ❤️");
    }
  };

  return (
    <button onClick={handleLogout} className="login">
      Logout
    </button>
  );
}

export default Logout;