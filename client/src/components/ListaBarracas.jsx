import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ListaBarracas.css';
import Navbar from './Navbar';
import Cookies from 'js-cookie';

const ListaBarracas = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [barracas, setBarracas] = useState([]);

  useEffect(() => {
    const fetchEvent = async () => {
      const token = Cookies.get('authToken');
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        console.log('Fetching event with ID:', eventId, 'using token:', token);
        const response = await fetch(`http://localhost:5000/api/events/${eventId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        console.log('Response status:', response.status);
        const data = await response.json();
        console.log('Event data fetched:', data);
        setEvent(data);
        setBarracas(data.barracas.filter(barraca => barraca.status === 'ativo'));
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (!event) {
    return <div>Loading...</div>;
  }

  const handleBackClick = () => {
    navigate(-1); // Retorna para a última página
  };

  const handleCardapioClick = (barracaId) => {
    navigate(`/event/${eventId}/barraca/${barracaId}/cardapio`);
  };

  return (
    <div className="container">
      <Navbar />
      <div className="lista-barracas-container">
        <button onClick={handleBackClick} className="back-button no-hover">←</button>
        <h1>{event.nome}</h1>
        <div className="barracas-list">
          {barracas.map(barraca => (
            <div key={barraca._id} className="barraca-card" onClick={() => handleCardapioClick(barraca._id)}>
              <h2>{barraca.nome}</h2>
              <h3>{barraca.descricao}</h3>
              <ul className="cardapio-list">
                {barraca.cardapio.filter(prato => prato.status === 'ativo').map(prato => (
                  <li key={prato._id}>{prato.nome}</li>
                ))}
              </ul>
              <div className="status">
                <strong>Status:</strong> {barraca.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListaBarracas;