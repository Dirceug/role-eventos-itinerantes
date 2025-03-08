import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ListaEventos.css';

const ListaEventos = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/events');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = (eventId) => {
    navigate(`/event/${eventId}/barracas`);
  };

  return (
    <div className="upcoming-events-container">
      {events.map(event => (
        <button
          key={event._id}
          className="event-button"
          style={{ backgroundImage: `url(${event.imagem || 'https://imgur.com/gallery/this-dude-brought-his-hermit-crab-to-music-festival-a5lKqbm'})` }}
          onClick={() => handleEventClick(event._id)}
        >
          <div className="event-overlay">
            <h2>{event.nome}</h2>
            <p>{event.descricao}</p>
            <div className="event-details">
              <p>{new Date(event.data).toLocaleDateString()}</p>
              <p>{new Date(event.data).toLocaleTimeString()}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default ListaEventos;