import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackButton.css';

const BackButton = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Volta para a última página
  };

  return (
    <button onClick={handleBackClick} className="back-button no-hover">←</button>
  );
};

export default BackButton;