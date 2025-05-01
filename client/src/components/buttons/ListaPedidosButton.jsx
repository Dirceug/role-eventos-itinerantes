import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ListaPedidosButton.css';
import cardapioIcon from '../../img/icones/cardapioBranco.png'; // Importar o ícone

function ListaPedidosButton({ eventId, userId, label }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/lista-pedidos');
  };

  return (
    <button className="lista-pedidos-button" onClick={handleClick}>
      <div className="lista-pedidos-content">
        <img src={cardapioIcon} alt="Lista de Pedidos" className="lista-pedidos-icon" />
        <span className="lista-pedidos-label">{label}</span>
      </div>
    </button>
  );
}

export default ListaPedidosButton;