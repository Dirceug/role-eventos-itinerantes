import React from 'react';
import './CardapioButtonBranco.css';
import carteiraIcon from '../img/icones/carteiraBranco.png'; // Importando o ícone

const CarteiraVirtualButtonBranco = ({ label, onClick }) => {
  return (
    <button className="cardapio-button" onClick={onClick}>
      <img src={carteiraIcon} alt="Carteira Virtual" className="cardapio-icon" />
      <span>{label}</span>
    </button>
  );
};

export default CarteiraVirtualButtonBranco;