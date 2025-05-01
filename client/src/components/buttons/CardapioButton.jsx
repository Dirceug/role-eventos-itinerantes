import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CardapioButton.css';
import cardapioIcon from '../../img/icones/cardapio.png'; // Importando o ícone

const CardapioButton = ({ label, eventId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/event/${eventId}/barracas`);
  };

  return (
    <button className="cardapio-button" onClick={handleClick}>
      <img src={cardapioIcon} alt="Cardápio" className="cardapio-icon" />
      <span>{label}</span>
    </button>
  );
};

export default CardapioButton;