import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './DetalheEvento.css';
import Navbar from './Navbar';
import Cookies from 'js-cookie';
import UserContext from '../contexts/UserContext';

const DetalheEvento = (props) => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const { user } = useContext(UserContext);

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
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    fetchEvent();
  }, [eventId]);

  useEffect(() => {
    console.log('Props recebidas no DetalheEvento:', props);
  }, [props]);

  if (!event) {
    return <div>Loading...</div>;
  }

  const handleBackClick = () => {
    navigate('/upcoming-events');
  };

  const handleLikeClick = async () => {
    const token = Cookies.get('authToken');
    if (!token) {
      alert('Você precisa estar logado para curtir um evento.');
      navigate('/login');
      return;
    }

    try {
      console.log('Liking event with ID:', eventId, 'by user with token:', token);
      const response = await fetch(`http://localhost:5000/api/events/${eventId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userId: user.firebaseUid })
      });
      console.log('Response status:', response.status);
      if (response.ok) {
        const updatedEvent = await response.json();
        console.log('Event liked successfully:', updatedEvent);
        setEvent(updatedEvent);
        alert(`Você curtiu o evento ${event.nome}`);
      } else {
        const errorData = await response.json();
        console.error('Erro ao curtir o evento:', errorData);
      }
    } catch (error) {
      console.error('Erro ao curtir o evento:', error);
    }
  };

  const handleShareClick = (socialMedia) => {
    alert(`Compartilhado com ${socialMedia}`);
  };

  const handleCardapioClick = () => {
    navigate(`/event/${eventId}/barracas`);
  };

  return (
    <div className="container">
      <Navbar />
      <div className="detalhe-evento-container">
        <div className="detalhe-evento-header">
          <button onClick={handleBackClick} className="back-button no-hover">←</button>
          <button onClick={handleLikeClick} className="like-button">❤️ {event.numeroFavoritos}</button>
        </div>
        <div className="detalhe-evento-foto">
          <img src={event.fotoUrl} alt={event.nome} />
        </div>
        <div className="detalhe-evento-info">
          <h2>{event.nome}</h2>
          <p>{new Date(event.data).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })} - {new Date(event.data).toLocaleDateString('pt-BR', { weekday: 'long' })}</p>
          <p>{event.descricao}</p>
          <div className="data-detalhada-container">
            {event.dataEvento && event.dataEvento.map((data, index) => (
              <div key={index} className="data-detalhada">
                <p>{new Date(data.dataAbertura).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })} - {new Date(data.dataAbertura).toLocaleDateString('pt-BR', { weekday: 'long' })}</p>
                <br/>
                <p>Abertura: {data.horaAbertura}</p>
                <p>Fechamento: {data.horaFechamento}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="detalhe-evento-footer">
          <div className="social-buttons">
            <button onClick={() => handleShareClick('Instagram')}>
              <img src="/img/icones/instagram.png" alt="Instagram" />
            </button>
            <button onClick={() => handleShareClick('Facebook')}>
              <img src="/img/icones/facebook.png" alt="Facebook" />
            </button>
            <button onClick={() => handleShareClick('WhatsApp')}>
              <img src="/img/icones/whatsapp.png" alt="WhatsApp" />
            </button>
          </div>
          <div className="cardapio-button">
            <button onClick={handleCardapioClick}>Ver Barracas</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalheEvento;