import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ListaBarracas.css';

const ListaBarracas = () => {
  const { eventId } = useParams();
  const [barracas, setBarracas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBarracas = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/events/${eventId}`);
        const data = await response.json();
        setBarracas(Object.values(data.barracas));
      } catch (error) {
        console.error('Error fetching barracas:', error);
      }
    };

    fetchBarracas();
  }, [eventId]);

  const handleBarracaClick = (barracaId) => {
    navigate(`/barraca/${barracaId}/cardapio`);
  };

  return (
    <div className="barracas-container">
      {barracas.map(barraca => (
        <button
          key={barraca._id}
          className="barraca-button"
          onClick={() => handleBarracaClick(barraca._id)}
        >
          <h2>{barraca.nome}</h2>
          <p>{barraca.descricao}</p>
        </button>
      ))}
    </div>
  );
};

export default ListaBarracas;