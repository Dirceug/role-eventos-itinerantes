import React, { createContext, useState, useEffect, useMemo } from 'react';
import Cookies from 'js-cookie';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  console.log('UserProvider montado');
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get('authToken');
      console.log('Token obtido (UserContext):', token ? token.substring(0, 10) + '...' + token.substring(token.length - 10) : 'null');
      if (!token) {
        console.error('No token found');
        setLoadingUser(false);
        return;
      }

      try {
        console.log('API URL:', import.meta.env.VITE_API_URL);
        const apiUrl = import.meta.env.VITE_API_URL;
        if (!apiUrl) {
          throw new Error('API URL is not defined. Please check your environment variables.');
        }

        const response = await fetch(`${apiUrl}/users/me`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        // Log the response if it's not ok
        if (!response.ok) {
          const responseText = await response.text();
          console.error('Error response:', responseText);
          
          if (response.status === 404) {
            console.error('User not found');
          } else if (response.status === 401) {
            console.error('Unauthorized access - Invalid token');
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        } else {
          const data = await response.json();
          console.log('Dados do usuário recebidos:', data && data._id ? data._id : 'User ID not found');
          setUser(data);
          console.log('Usuário definido no contexto:', data && data._id ? data._id : 'User not defined yet');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, []);

  const value = useMemo(() => ({ user, setUser, loadingUser }), [user, loadingUser]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;