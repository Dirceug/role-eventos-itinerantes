import React, { useState, useEffect, useContext, lazy, Suspense, useCallback } from 'react';
import { debounce } from 'lodash';
import Cookies from 'js-cookie';
import UserContext from '../contexts/UserContext';
import './ListaUsuarios.css';

const Navbar = lazy(() => import('../components/layout/Navbar'));

const Usuarios = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { user } = useContext(UserContext);

  const fetchUsers = async (query) => {
    if (query.length < 2) {
      setMessage('Digite pelo menos 2 caracteres para buscar.');
      setUsers([]);
      setSuggestions([]);
      return;
    }

    setLoading(true);
    setMessage('');
    try {
      const token = Cookies.get('authToken');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/search?identifier=${query}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data) {
        setUsers([data]);
        setSuggestions([]);
        if (query.length === 5) {
          setMessage('Busca por correspondência exata.');
        }
      } else {
        setUsers([]);
        setMessage('Nenhum usuário encontrado.');
      }
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      setMessage('Erro ao buscar usuários.');
    } finally {
      setLoading(false);
    }
  };

  const fetchSuggestions = async (query) => {
    if (query.length >= 2) {
      setLoading(true);
      try {
        const token = Cookies.get('authToken');
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users/search?identifier=${query}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (data) {
          setSuggestions([data]);
        }
      } catch (error) {
        console.error('Erro ao buscar sugestões:', error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }
  };

  const debouncedFetchUsers = useCallback(
    debounce((query) => fetchUsers(query), 2000),
    []
  );

  const handleInputChange = (event) => {
    const query = event.target.value.trim();
    setSearchTerm(query);
    if (query.length >= 2) {
      fetchSuggestions(query);
      debouncedFetchUsers(query);
    } else {
      setSuggestions([]);
      setUsers([]);
      setMessage('Digite pelo menos 2 caracteres para buscar.');
    }
  };

  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Navbar user={user} />
      <div className="users-container">
        <h1 className='titulo'>Busca de Usuários</h1>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Digite o código do usuário"
          className="search-input"
        />
        {loading && <p>Carregando...</p>}
        {message && <p className="message">{message}</p>}
        <div className='resultado' >
          <h3>Resultados:</h3>
          {users.length > 0 ? (
            <ul>
              {users.map((user) => (
                <li key={user._id} className='parametros'>
                  <div className="detalhes">
                    <strong>Nome:</strong> {user.displayName} <br />
                    <strong>Email:</strong> {user.email} <br />
                  </div>
                  <div className="photo">
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className="user-photo"
                      />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhum usuário encontrado.</p>
          )}
        </div>
        <div>
          {suggestions.length > 0 && (
            <>
              <h3>Sugestões:</h3>
              <ul>
                {suggestions.map((user) => (
                  <li key={user._id}>
                    <strong>Nome:</strong> {user.displayName} <br />
                    <strong>Email:</strong> {user.email}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </Suspense>
  );
};

export default Usuarios;