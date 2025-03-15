import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DetalheCardapio.css';
import Navbar from './Navbar';
import Cookies from 'js-cookie';
import Comprar from './Comprar';
import UserContext from '../contexts/UserContext';
import BackButton from './BackButton';

const DetalheCardapio = () => {
  const { eventId, barracaId } = useParams();
  const navigate = useNavigate();
  const [barraca, setBarraca] = useState(null);
  const [pratoSelecionado, setPratoSelecionado] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchBarraca = async () => {
      const token = Cookies.get('authToken');
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/events/${eventId}/barracas/${barracaId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setBarraca(data);
      } catch (error) {
        console.error('Error fetching barraca:', error);
      }
    };

    fetchBarraca();
  }, [eventId, barracaId]);

  if (!barraca) {
    return <div>Loading...</div>;
  }

  const handleCompraClick = (prato) => {
    setPratoSelecionado(prato);
  };

  if (pratoSelecionado) {
    return <Comprar user={user} prato={pratoSelecionado} eventId={eventId} barracaId={barracaId} barracaNome={barraca.nome} />;
  }

  return (
    <div className="container">
      <Navbar eventId={eventId} />
      <div className="detalhe-cardapio-container">
        <BackButton />
        <h1>{barraca.nome}</h1>
        <div className="pratos-list">
          {barraca.cardapio.filter(prato => prato.status === 'ativo').sort((a, b) => a.nome.localeCompare(b.nome)).map(prato => (
            <div key={prato._id} className="prato-card">
              <img src={prato.imagem} alt={prato.nome} className="prato-imagem" />
              <div className="prato-info">
                <h3 className="prato-nome">{prato.nome}</h3>
                <p className="prato-ingredientes">{prato.ingredientes}</p>
                <div className="prato-bottom">
                  <h3 className="prato-valor">R$ {prato.valor}</h3>
                  <button onClick={() => handleCompraClick(prato)}>Comprar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetalheCardapio;