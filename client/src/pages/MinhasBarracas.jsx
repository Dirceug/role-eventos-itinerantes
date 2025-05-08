import React, { useEffect, useState, useContext, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import './MinhasBarracas.css';
import Cookies from 'js-cookie';
import UserContext from '../contexts/UserContext';

// Lazy loading dos componentes Navbar e BackButton para melhorar o desempenho
const Navbar = lazy(() => import('../components/layout/Navbar'));
const BackButton = lazy(() => import('../components/buttons/BackButton'));

const ListaEventosFiltrados = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // Contexto para obter informações do usuário
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const fetchEventos = async () => {
      const token = Cookies.get('authToken'); // Obtém o token de autenticação
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        // Faz a requisição para buscar os eventos
        const response = await fetch(`${import.meta.env.VITE_API_URL}/events`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Filtra os eventos onde o funcionário está associado
        const userEventos = Array.isArray(data)
          ? data.filter((evento) =>
              evento.funcionarios.some(
                (funcionario) => funcionario.identifier === user._id
              )
            )
          : [];

        setEventos(userEventos); // Define os eventos filtrados no estado
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEventos();
  }, [user._id]);

  if (!eventos.length) {
    return <div>Carregando ou nenhum evento encontrado...</div>;
  }

  const handleEventClick = (eventId) => {
    navigate(`/event/${eventId}`); // Navega para a página do evento selecionado
  };

  const userToken = Cookies.get('authToken');

  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Navbar user={user} token={userToken} />
      <div className="container">
        <div className="lista-eventos-container">
          <BackButton />
          <h1>Meus Eventos</h1>
          <div className="eventos-list">
            {eventos.map((evento) => (
              <div
                key={evento._id}
                className="evento-card"
                onClick={() => handleEventClick(evento._id)}
              >
                <h2>{evento.nome}</h2>
                <h3>{evento.descricao}</h3>
                <div className="status">
                  <strong>Status:</strong> {evento.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default ListaEventosFiltrados;