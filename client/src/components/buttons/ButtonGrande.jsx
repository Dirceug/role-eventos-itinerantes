import React from 'react';
import './ButonGrande.css';

function ButonGrande({ onClick, className, children }) {
  return (
    <button onClick={onClick} className={`button-grande ${className}`}>
      {children}
    </button>
  );
}

export default ButonGrande;