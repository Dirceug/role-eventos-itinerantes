import React, { useState, useEffect, useContext, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import './ListaEventos.css';
import eventoBase from '../img/eventoBase.jpeg';
import Cookies from 'js-cookie';
import UserContext from '../contexts/UserContext';
import state from "../img/state.png"

const Navbar = lazy(() => import('../components/layout/Navbar'));
const CurtidasButton = lazy(() => import('../components/buttons/CurtidasButton'));
const CardapioButton = lazy(() => import('../components/buttons/CardapioButton'));

const ListaEventos = () => {
  const [events, setEvents] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      const token = Cookies.get('authToken');
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/events`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setEvents(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = (eventId) => {
    navigate(`/event/${eventId}/details`);
  };

  const handleCardapioClick = (eventId, e) => {
    e.stopPropagation();
    navigate('/lista-barracas', { state: { eventId, userId: user ? user.uid : null } });
  };

  const userToken = Cookies.get('authToken');

  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Navbar user={user} token={userToken} />
      <div className="upcoming-events-container">
        {events.map(event => (
          <div
            key={event._id}
            className="event"
            // style={{ backgroundImage: `url(${event.fotoUrl || eventoBase})` }}
            style={{ backgroundImage: `url(stateImage})` }} // Use a variável importada
            onClick={() => handleEventClick(event._id)}
          >
            <div className="event-overlay">
              <div className="event-content">
                <div className="event-title">
                  <h2>{event.nome}</h2>
                </div>
                <div className="event-description">
                  <p className="event-descricao">{event.descricao.length > 244 ? `${event.descricao.substring(0, 241)}...` : event.descricao}</p>
                  <p><br /></p>
                  <p>{event.endereco.cidade} - {event.endereco.estado}</p>
                </div>
                <div className="event-details">
                  {event.dataEvento && event.dataEvento.map((data, index) => (
                    <div key={index} className="event-date">
                      <p className="date">{new Date(data.dataAbertura).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}</p>
                      <p className="time">{data.horaAbertura}</p>
                      <p className="time">{data.horaFechamento}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="event-likes" onClick={(e) => e.stopPropagation()}>
                <CurtidasButton eventId={event._id} initialLikesCount={event.numeroFavoritos} />
              </div>
              <div className="event-barracas" onClick={(e) => handleCardapioClick(event._id, e)}>
                <CardapioButton label="Ver Barracas" size="40px" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Suspense>
  );
};

export default ListaEventos;