import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

const ProtectedRoute = ({ element }) => {
  const { user } = useContext(UserContext);

  if (!user) {
    // Se o usuário não está logado, redirecione para a página de login
    return <Navigate to="/login" />;
  }

  // Se o usuário está logado, renderize o componente desejado
  return element;
};

export default ProtectedRoute;