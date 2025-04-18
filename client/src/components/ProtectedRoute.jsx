import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ element }) => {
  const { user, setUser } = useContext(UserContext);
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
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${apiUrl}/users/me`, {
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
            Cookies.remove('authToken');
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        } else {
          const userData = await response.json();
          setUser(userData);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        console.error('Error verifying user:', error);
      }
    };

    verifyUser();
  }, [setUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default ProtectedRoute;