import React from 'react';
import './CardapioButtonBranco.css';
import cardapioIcon from '../../img/icones/cardapioBranco.png'; // Importar o ícone

function CardapioButtonBranco({ eventId, userId, label, onClick }) {
  return (
    <button className="cardapio-button-branco" onClick={onClick}>
      <img src={cardapioIcon} alt="Cardápio" className="cardapio-icon" />
      {label}
    </button>
  );
}

export default CardapioButtonBranco;