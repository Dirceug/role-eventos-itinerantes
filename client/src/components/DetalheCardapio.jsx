import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DetalheCardapio.css';
import Navbar from './Navbar';
import Cookies from 'js-cookie';
import Comprar from './Comprar';
import UserContext from '../contexts/UserContext'; // Importando o contexto do usuário
import BackButton from './BackButton'; // Importando o BackButton

const DetalheCardapio = () => {
  const { eventId, barracaId } = useParams();
  const navigate = useNavigate();
  const [barraca, setBarraca] = useState(null);
  const [pratoSelecionado, setPratoSelecionado] = useState(null); // Estado para o prato selecionado
  const { user } = useContext(UserContext); // Obtendo o usuário logado do contexto

  useEffect(() => {
    const fetchBarraca = async () => {
      const token = Cookies.get('authToken');
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        console.log('Fetching barraca with eventId:', eventId, 'and barracaId:', barracaId, 'using token:', token);
        const response = await fetch(`http://localhost:5000/api/events/${eventId}/barracas/${barracaId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        console.log('Response status:', response.status);
        const data = await response.json();
        console.log('Barraca data fetched:', data);
        setBarraca(data);
      } catch (error) {
        console.error('Error fetching barraca:', error);
      }
    };

    fetchBarraca();
  }, [eventId, barracaId]);

  useEffect(() => {
    alert(`Props recebidas: eventId=${eventId}, barracaId=${barracaId}`);
  }, [eventId, barracaId]);

  if (!barraca) {
    return <div>Loading...</div>;
  }

  const handleCompraClick = (prato) => {
    setPratoSelecionado(prato); // Define o prato selecionado e exibe o componente Comprar
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