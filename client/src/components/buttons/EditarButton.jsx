import React from 'react';
import './CardapioButton.css';
import configIcon from '../../img/icones/configuracao.png'; // Importando o ícone

const EditarButton = ({ label, onClick }) => {
  return (
    <button className="cardapio-button" onClick={(e) => {
      e.stopPropagation(); // Impede a propagação do clique para elementos pai
      onClick(); // Chama a função passada como prop para abrir o modal
    }}>
      <img src={configIcon} alt="Editar" className="cardapio-icon" />
      <span>{label}</span>
    </button>
  );
};

export default EditarButton;