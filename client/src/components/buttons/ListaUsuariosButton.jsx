import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ListaPedidosButton.css';
import userIcon from '../../img/icones/userBranco.png'; // Importar o ícone

function ListaPedidosButton({ eventId, userId, label }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/ListaUsuarios');
  };

  return (
    <button className="lista-pedidos-button" onClick={handleClick}>
      <div className="lista-pedidos-content">
        <img src={userIcon} alt="Lista de Usuários" className="lista-pedidos-icon" />
        <span className="lista-pedidos-label">{label}</span>
      </div>
    </button>
  );
}

export default ListaPedidosButton;