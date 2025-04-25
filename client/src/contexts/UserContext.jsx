import React, { createContext, useState, useEffect, useMemo } from 'react';
import Cookies from 'js-cookie';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get('authToken');
      console.log('Token obtido (UserContext):', token );
      if (!token) {
        console.error('No token found');
        setLoadingUser(false);
        return;
      }

      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        if (!apiUrl) {
          throw new Error('API URL is not defined. Please check your environment variables.');
        }

        const response = await fetch(`${apiUrl}/api/users/me`, {
          method: 'GET',
          headers: {
            //'Content-Type': 'application/json',
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
          console.log('Usuário carregado:', data);
          setUser(data);
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