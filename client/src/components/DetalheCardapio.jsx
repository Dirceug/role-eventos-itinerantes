import React, { useEffect, useState, useContext, lazy, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DetalheCardapio.css';
import Cookies from 'js-cookie';
import UserContext from '../contexts/UserContext';

const Navbar = lazy(() => import('./Navbar'));
const BackButton = lazy(() => import('./buttons/BackButton'));
const Comprar = lazy(() => import('./Comprar'));

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
    return (
      <Suspense fallback={<div>Carregando...</div>}>
        <Comprar user={user} prato={pratoSelecionado} eventId={eventId} barracaId={barracaId} barracaNome={barraca.nome} />
      </Suspense>
    );
  }

  const userToken = Cookies.get('authToken');

  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Navbar user={user} token={userToken} eventId={eventId} />
      <div className="container">
        <div className="detalhe-cardapio-container">
          <div className="detalhe-evento-cardapio">
            <BackButton />
          </div>
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
    </Suspense>
  );
};

export default DetalheCardapio;