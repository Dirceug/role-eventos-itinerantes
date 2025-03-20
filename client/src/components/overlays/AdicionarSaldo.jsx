import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { ScaleLoader } from 'react-spinners';
import Joi from 'joi';
import './AdicionarSaldo.css';
import UserContext from '../../contexts/UserContext.jsx';
import olhoFechado from '../../img/icones/olhoFechadoLaranja.png';
import olhoAberto from '../../img/icones/olhoAbertoLaranja.png';

import useSaldo from '../../hooks/VerSaldo.js';


const SaldoLoader = () => (
  <div className="loader-container">
    <ScaleLoader color="#EE7F43" height={100} radius={15} speedMultiplier={1} width={1} />
  </div>
);

Modal.setAppElement('#root'); // Define o elemento raiz da sua aplicação

const AdicionarSaldo = ({ isOpen, onRequestClose, userId, token }) => {
  const { loadingUser } = useContext(UserContext);
  const { saldo, loading: loadingSaldo } = useSaldo(userId, token);
  const [valor, setValor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userDisplayName, setUserDisplayName] = useState('');
  const [showSaldo, setShowSaldo] = useState(false); // Estado para alternar a exibição do saldo

  useEffect(() => {
    if (isOpen && userId) {
      const fetchSaldo = async () => {
        setLoadingSaldo(true);
        try {
          const response = await axios.get(`http://localhost:5000/api/transactions/saldo/${userId}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setSaldo(response.data.saldo);
        } catch (error) {
          console.error('Erro ao buscar saldo:', error);
        }
        setLoadingSaldo(false);
      };

      const fetchUser = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/users/${userId}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setUserDisplayName(response.data.displayName);
        } catch (error) {
          console.error('Erro ao buscar usuário:', error);
        }
      };

      fetchSaldo();
      fetchUser();
    }
  }, [isOpen, userId, token]);

  const schema = Joi.object({
    valor: Joi.number().min(10).max(500).required()
      .messages({
        'number.base': 'Por favor, insira um valor válido.',
        'number.min': 'O valor mínimo é R$10,00.',
        'number.max': 'O valor máximo é R$500,00.'
      })
  });

  const handleChange = (e) => {
    const formattedValue = e.target.value.replace(/[^0-9.,]/g, '').replace(/,/g, '.');
    setValor(formattedValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const parsedValor = parseFloat(valor);
    const { error } = schema.validate({ valor: parsedValor });
    if (error) {
      setError(error.message);
      return;
    }
    setError('');
    setLoading(true);

    const transactionData = {
      usuarioId: userId,
      eventoId: null,
      valor: parsedValor,
      moeda: 'BRL',
      tipo: 'adição de saldo',
      descricao: 'Adição de saldo via frontend',
      status: 'pendente'
    };

    console.log('Enviando transação:', transactionData);

    try {
      await axios.post('http://localhost:5000/api/transactions', transactionData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setLoading(false);
      onRequestClose();
    } catch (error) {
      console.error('Erro ao adicionar saldo:', error);
      setLoading(false);
    }
  };

  const toggleShowSaldo = () => {
    setShowSaldo(!showSaldo);
  };

  if (loadingUser) {
    return <SaldoLoader />;
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="adicionar-saldo-modal"
    >
      {loadingSaldo ? (
        <SaldoLoader />
      ) : (
        <div className="modal-content">
          <button className="close-button" onClick={onRequestClose}>X</button>
          <p className="saldo-info">Olá {userDisplayName}, seu saldo atual é de:</p>
          <div className="saldo-container">
            <h1 className="saldo-valor">
              {showSaldo ? `R$ ${saldo}` : 'R$ ***,**'}
            </h1>
            <button className="toggle-saldo-button" onClick={toggleShowSaldo}>
              <img src={showSaldo ? olhoAberto : olhoFechado} alt="Toggle Saldo" />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <label className="valor-label" htmlFor="valor">Valor a adicionar:</label>
            <input
              type="text"
              id="valor"
              className="valor-input"
              value={valor}
              onChange={handleChange}
              placeholder="R$ 0,00"
            />
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? (
                <ScaleLoader color="#EE7F43" height={20} radius={10} speedMultiplier={1} width={2} />
              ) : (
                'Adicionar saldo'
              )}
            </button>
          </form>
        </div>
      )}
    </Modal>
  );
};

export default AdicionarSaldo;