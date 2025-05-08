import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PedidosBarracas.css';
import Cookies from 'js-cookie';

const PedidosBarracas = () => {
  const [pedidos, setPedidos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook para navegação

  useEffect(() => {
    const fetchPedidos = async () => {
      const token = Cookies.get('authToken');
      if (!token) {
        console.error('No token found');
        setError('Você não está autenticado. Por favor, faça login novamente.');
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/pedidos`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Erro HTTP! status: ${response.status}`);
        }

        const data = await response.json();
        setPedidos(data);
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
        setError('Ocorreu um erro ao buscar os pedidos. Tente novamente mais tarde.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPedidos();
  }, []);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div>
      {/* Botão Back */}
      <button className="back-button" onClick={() => navigate(-1)}>
        Back
      </button>

      <div className="lista-pedidos-container">
        {pedidos.map((pedido) => (
          <div key={pedido._id} className="pedido-card">
            <h2>{pedido.nomePrato}</h2>
            <p><strong>Número do Pedido:</strong> {pedido.numeroPedido}</p>
            <p><strong>Quantidade:</strong> {pedido.quantidade}</p>
            <p><strong>Status:</strong> {pedido.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PedidosBarracas;