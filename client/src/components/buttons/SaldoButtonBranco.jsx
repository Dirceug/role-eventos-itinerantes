import React, { useState, useEffect, lazy, Suspense } from 'react';
import './SaldoButtonBranco.css';
import saldoIcon from '../../img/icones/carteiraBranco.png';

const AdicionarSaldo = lazy(() => import('../overlays/AdicionarSaldo'));

function SaldoButtonBranco({ userId, token, label }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.log('AdicionarSaldo userId:', userId);
  }, [userId]);

  const handleOpenModal = () => {
    console.log('Token obtido (UserContext):', token ? token.substring(0, 10) : 'null');
    if (!token) {
      console.error('No token found');
      return;
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button className="saldo-button-branco" onClick={handleOpenModal}>
        <div className="saldo-content">
          <img src={saldoIcon} alt="Saldo" className="saldo-icon" />
          <span className="saldo-label">{label}</span>
        </div>
      </button>
      <Suspense fallback={<div>Carregando...</div>}>
        <AdicionarSaldo
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          userId={userId}
          token={token}
        />
      </Suspense>
      {!userId && console.log("SaldoButtonBranco: userId is null")}
    </>
  );
}

export default SaldoButtonBranco;