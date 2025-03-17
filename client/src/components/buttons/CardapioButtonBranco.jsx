import React from 'react';
import './CardapioButtonBranco.css';
import cardapioIcon from '../../img/icones/cardapioBranco.png'; // Importar o ícone

function CardapioButtonBranco({ eventId, userId, label, onClick }) {
  return (
    <button className="cardapio-button-branco" onClick={onClick}>
      <div className="cardapio-content">
        <img src={cardapioIcon} alt="Cardápio" className="cardapio-icon" />
        <span className="cardapio-label">{label}</span>
      </div>
    </button>
  );
}

export default CardapioButtonBranco;