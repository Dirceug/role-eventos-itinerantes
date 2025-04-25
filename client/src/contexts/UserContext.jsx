import React, { createContext, useState, useEffect, useMemo } from 'react';
import Cookies from 'js-cookie';
import { auth } from '../firebase';


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

const fetchUser = async () => {
  try {
    // Renove o token antes de fazer a solicitação
    const user = auth.currentUser;
    if (!user) {
      console.error('Nenhum usuário autenticado.');
      return null;
    }

    const idToken = await user.getIdToken(true); // Renova o token antes de usá-lo
    Cookies.set('authToken', idToken, { expires: 1 }); // Atualiza o token nos cookies
    console.log('Token renovado e salvo:', idToken);

    // Faça a requisição ao backend
    const apiUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(`${apiUrl}/api/users/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${idToken}`,
      },
    });

    if (!response.ok) {
      const responseText = await response.text();
      console.error('Erro de resposta:', responseText);
      if (response.status === 404) {
        console.error('Usuário não encontrado.');
      } else if (response.status === 401) {
        console.error('Acesso não autorizado - Token inválido.');
      } else {
        throw new Error(`Erro HTTP: status ${response.status}`);
      }
      return null;
    }

    const userData = await response.json();
    console.log('Usuário carregado:', userData);
    setUser(userData);
  } catch (error) {
    console.error('Erro ao buscar ou renovar o token:', error);
  } finally {
    setLoadingUser(false);
  }
};

export default UserContext;