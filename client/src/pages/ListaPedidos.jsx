import React, { useEffect, useState, useContext, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import './ListaPedidos.css';
import Cookies from 'js-cookie';
import UserContext from '../contexts/UserContext';
import PedidoAgendado from '../img/icones/pedidoAgendado.png';
import PedidoDelivery from '../img/icones/pedidoDelivery.png';
import PedidoEntregue from '../img/icones/pedidoEntregue.png';
import PedidoPreparando from '../img/icones/pedidoPreparando.png';
import PedidoRecebido from '../img/icones/pedidoRecebido.png';
import PedidoRetirada from '../img/icones/pedidoRetirada.png';

const Navbar = lazy(() => import('../components/layout/Navbar'));

const ListaPedidos = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      const token = Cookies.get('authToken');
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/pedidos`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const userPedidos = data.filter(pedido => pedido.usuarioId === user._id);
        userPedidos.sort((a, b) => {
          const statusOrder = ['pendente', 'agendado', 'preparando', 'pronto', 'enviado', 'entregue'];
          return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
        });
        setPedidos(userPedidos);
      } catch (error) {
        console.error('Error fetching pedidos:', error);
      }
    };

    if (user) {
      fetchPedidos();
    }
  }, [user]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pendente':
        return PedidoRecebido;
      case 'agendado':
        return PedidoAgendado;
      case 'preparando':
        return PedidoPreparando;
      case 'pronto':
        return PedidoRetirada;
      case 'enviado':
        return PedidoDelivery;
      case 'entregue':
        return PedidoEntregue;
      default:
        return null;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Navbar user={user} />
      <div className="lista-pedidos-container">
        {pedidos.map(pedido => (
          <div key={pedido._id} className="pedido-card">
            <img src={pedido.foto} alt={pedido.nomePrato} className="pedido-img" />
            <div className="pedido-info">
              <h2>{pedido.nomePrato}</h2>
              <p><strong>Valor:</strong> R${pedido.valor}</p>
              <p><strong>Status:</strong> {pedido.status}</p>
              <p><strong>Tempo de Preparo:</strong> {pedido.tempoPreparo} minutos</p>
              <p><strong>Última alteração:</strong> {formatDate(pedido.ultimaAtualizacao)}</p>
            </div>
            <img src={getStatusIcon(pedido.status)} alt={pedido.status} className="status-icon" />
          </div>
        ))}
      </div>
    </Suspense>
  );
};

export default ListaPedidos;