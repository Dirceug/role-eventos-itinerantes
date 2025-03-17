import React, { useEffect, useState, useContext, lazy, Suspense } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ListaBarracas.css';
import Cookies from 'js-cookie';
import UserContext from '../contexts/UserContext';

const Navbar = lazy(() => import('./Navbar'));
const BackButton = lazy(() => import('./buttons/BackButton'));

const ListaBarracas = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { eventId } = location.state || {};
  const { user } = useContext(UserContext);
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
        const response = await fetch(`http://localhost:5000/api/events/${eventId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setEvent(data);
        setBarracas(data.barracas.filter(barraca => barraca.status === 'ativo'));
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);

  if (!event) {
    return <div>Loading...</div>;
  }

  const handleCardapioClick = (barracaId) => {
    navigate(`/event/${eventId}/barraca/${barracaId}/cardapio`);
  };

  const userToken = Cookies.get('authToken');

  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Navbar user={user} token={userToken} />
      <div className="container">
        <div className="lista-barracas-container">
          <BackButton />
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
    </Suspense>
  );
};

export default ListaBarracas;