import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import Cookies from 'js-cookie'; // Importar a biblioteca de cookies

const ProtectedRoute = ({ element }) => {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      const token = Cookies.get('authToken');
      if (!token) {
        console.error('No token found');
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/users/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          setIsLoading(false);
          if (response.status === 401) {
            console.error('Unauthorized access - Invalid token');
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        console.error('Error verifying user:', error);
      }
    };

    verifyUser();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;