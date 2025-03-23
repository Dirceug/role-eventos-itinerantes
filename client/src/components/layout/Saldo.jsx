import React, { useContext } from 'react';
import { ScaleLoader } from 'react-spinners';
import olhoFechado from '../../img/icones/olhoFechadoLaranja.png';
import olhoAberto from '../../img/icones/olhoAbertoLaranja.png';
import UserContext from '../../contexts/UserContext';
import useSaldo from '../../hooks/VerSaldo.js';
import './Saldo.css';

const SaldoLoader = () => (
  <div className="loader-container">
    <ScaleLoader color="#EE7F43" height={100} radius={15} speedMultiplier={1} width={1} />
  </div>
);

const Saldo = ({ userId, token, showSaldo, toggleShowSaldo }) => {
  const { loadingUser } = useContext(UserContext);
  const { saldo, loading: loadingSaldo } = useSaldo(userId, token);

  if (loadingUser || loadingSaldo) {
    return <SaldoLoader />;
  }

  return (
    <div className="saldo-container">
      <h1 className="saldo-valor">
        {showSaldo ? `R$ ${saldo}` : 'R$ ***,**'}
      </h1>
      <button className="toggle-saldo-button" onClick={toggleShowSaldo}>
        <img src={showSaldo ? olhoAberto : olhoFechado} alt="Toggle Saldo" />
      </button>
    </div>
  );
};

export default Saldo;