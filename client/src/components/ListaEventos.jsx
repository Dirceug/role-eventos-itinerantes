import React, { useState, useEffect, useContext, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import './ListaEventos.css';
import eventoBase from '../img/eventoBase.jpeg';
import Cookies from 'js-cookie';
import UserContext from '../contexts/UserContext';

const Navbar = lazy(() => import('./Navbar'))
const CurtidasButton = lazy (() => import('./buttons/CurtidasButton'))
const CardapioButton = lazy (() => import('./buttons/CardapioButton'))

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
        const response = await fetch('http://localhost:5000/api/events', {
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

  const userToken = Cookies.get('authToken');

  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Navbar user={user} token={userToken} />
      <div className="upcoming-events-container">
        {events.map(event => (
          <div
            key={event._id}
            className="event"
            style={{ backgroundImage: `url(${event.fotoUrl || eventoBase})` }}
          >
            <div className="event-overlay">
              <button
                className="event-button event-title"
                onClick={() => handleEventClick(event._id)}
              >
                <h2>{event.nome}</h2>
              </button>
              <button
                className="event-button event-description"
                onClick={() => handleEventClick(event._id)}
              >
                <p>{event.descricao.length > 244 ? `${event.descricao.substring(0, 241)}...` : event.descricao}</p>
              </button>
              <div className="event-details">
                {event.dataEvento && event.dataEvento.map((data, index) => (
                  <button
                    key={index}
                    className="event-date"
                    onClick={() => handleEventClick(event._id)}
                  >
                    <p className="date">{new Date(data.dataAbertura).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}</p>
                    <p className="time">{data.horaAbertura}</p>
                    <p className="time">{data.horaFechamento}</p>
                  </button>
                ))}
              </div>
              <div className="event-likes">
                <CurtidasButton eventId={event._id} initialLikesCount={event.numeroFavoritos} />
              </div>
              <div className="event-barracas">
                <CardapioButton label="Ver Barracas" eventId={event._id} size="40px" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Suspense>
  );
};

export default ListaEventos;