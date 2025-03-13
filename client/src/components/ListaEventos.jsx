import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './ListaEventos.css';
import eventoBase from '../img/eventoBase.jpeg';
import Navbar from './Navbar';
import Cookies from 'js-cookie';
import UserContext from '../contexts/UserContext';

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
        console.log('Fetching events from API with token:', token);
        const response = await fetch('http://localhost:5000/api/events', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        console.log('Response status:', response.status);
        const data = await response.json();
        console.log('Events fetched:', data);
        setEvents(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = (eventId) => {
    console.log('Navigating to event details for event ID:', eventId);
    navigate(`/event/${eventId}/details`);
  };

  return (
    <>
      <Navbar />
      <div className="upcoming-events-container">
        {events.map(event => (
          <button
            key={event._id}
            className="event-button"
            style={{ backgroundImage: `url(${event.fotoUrl || eventoBase})` }}
            onClick={() => handleEventClick(event._id)}
          >
            <div className="event-overlay">
              <h2>{event.nome}</h2>
              <p>{event.descricao.length > 244 ? `${event.descricao.substring(0, 241)}...` : event.descricao}</p>
              <div className="event-details">
                {event.dataEvento && event.dataEvento.map((data, index) => (
                  <div key={index} className="event-date">
                    <p className="date">{new Date(data.dataAbertura).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}</p>
                    <p className="time">{data.horaAbertura}</p>
                    <p className="time">{data.horaFechamento}</p>
                  </div>
                ))}
              </div>
              <div className="event-likes">
                <span className="heart">❤️</span>
                <span className="likes">{event.numeroFavoritos}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </>
  );
};

export default ListaEventos;