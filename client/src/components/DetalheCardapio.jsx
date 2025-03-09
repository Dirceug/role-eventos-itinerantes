import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DetalheCardapio.css';
import Navbar from './Navbar';

const DetalheCardapio = () => {
  const { eventId, barracaId } = useParams();
  const navigate = useNavigate();
  const [barraca, setBarraca] = useState(null);

  useEffect(() => {
    const fetchBarraca = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/events/${eventId}/barracas/${barracaId}`);
        const data = await response.json();
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

  const handleBackClick = () => {
    navigate(-1); // Retorna para a última página
  };

  const handleCompraClick = (pratoNome) => {
    alert(`${pratoNome} comprado. Parabéns pela compra.`);
  };

  return (
    <div className="container">
      <Navbar />
      <div className="detalhe-cardapio-container">
        <button onClick={handleBackClick} className="back-button no-hover">←</button>
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
                  <button onClick={() => handleCompraClick(prato.nome)}>Comprar</button>
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