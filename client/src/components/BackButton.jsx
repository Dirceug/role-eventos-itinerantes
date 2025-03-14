import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackButton.css';

const BackButton = ({ to }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(to);
  };

  return (
    <button onClick={handleBackClick} className="back-button no-hover">←</button>
  );
};

export default BackButton;