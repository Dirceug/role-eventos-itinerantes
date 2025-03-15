import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DetalheEvento.css';
import Navbar from './Navbar';
import Cookies from 'js-cookie';
import UserContext from '../contexts/UserContext';
import CurtidasButton from './buttons/CurtidasButton';
import BackButton from './buttons/BackButton';

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
        const response = await fetch(`http://localhost:5000/api/events/${eventId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (!event) {
    return <div>Loading...</div>;
  }

  const handleShareClick = (socialMedia) => {
    alert(`Compartilhado com ${socialMedia}`);
  };

  const handleCardapioClick = () => {
    navigate(`/event/${eventId}/barracas`);
  };

  return (
    <>
      <Navbar eventId={eventId} />
    <div className="container">
      <div className="detalhe-evento-container">
        <div className="detalhe-evento-header">
          <BackButton />
          <CurtidasButton eventId={eventId} initialLikesCount={event.numeroFavoritos} />
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

        </div>
      </div>
    </div>
            </>
  );
};

export default DetalheEvento;