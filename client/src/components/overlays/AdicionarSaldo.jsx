import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { ScaleLoader } from 'react-spinners';
import Joi from 'joi';
import { toast } from 'react-toastify';
import './AdicionarSaldo.css';
import UserContext from '../../contexts/UserContext';
import olhoFechado from '../../img/icones/olhoFechadoLaranja.png';
import olhoAberto from '../../img/icones/olhoAbertoLaranja.png';

import useSaldo from '../../hooks/VerSaldo.js';

const SaldoLoader = () => (
  <div className="loader-container">
    <ScaleLoader color="#EE7F43" height={100} radius={15} speedMultiplier={1} width={1} />
  </div>
);

Modal.setAppElement('#root');

const AdicionarSaldo = ({ isOpen, onRequestClose, userId, token }) => {
  const { loadingUser } = useContext(UserContext);
  const { saldo, loading: loadingSaldo, setSaldo, setLoadingSaldo } = useSaldo(userId, token);
  const [valor, setValor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userDisplayName, setUserDisplayName] = useState('');
  const [showSaldo, setShowSaldo] = useState(false);

  useEffect(() => {
    if (isOpen && userId) {
      const fetchSaldo = async () => {
        setLoadingSaldo(true);
        try {
          const apiUrl = import.meta.env.VITE_API_URL;
          if (!apiUrl) {
            console.error('API URL is not defined');
            return;
          }

          const response = await axios.get(`${apiUrl}/transactions/saldo/${userId}`, {
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
          const apiUrl = import.meta.env.VITE_API_URL;
          if (!apiUrl) {
            console.error('API URL is not defined');
            return;
          }

          const response = await axios.get(`${apiUrl}/users/${userId}`, {
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
  }, [isOpen, userId, token, setLoadingSaldo, setSaldo]);

  const schema = Joi.object({
    valor: Joi.number().min(10).max(500).required()
      .messages({
        'number.base': 'Por favor, insira um valor válido.',
        'number.min': 'O valor mínimo é R$10,00.',
        'number.max': 'O valor máximo é R$500,00.'
      })
  });

  const handleChange = (e) => {
    const input = e.target.value.replace(/\D/g, '');
    const formattedValue = (Number(input) / 100).toFixed(2).replace('.', ',');
    setValor(formattedValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const parsedValor = parseFloat(valor.replace(',', '.'));
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

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      if (!apiUrl) {
        console.error('API URL is not defined');
        return;
      }

      const response = await axios.post(`${apiUrl}/transactions`, transactionData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      toast.success(response.data.message); // Exibir mensagem de sucesso
      setLoading(false);
      onRequestClose();
    } catch (error) {
      console.error('Erro ao adicionar saldo:', error);
      toast.error('Erro ao adicionar saldo. Tente novamente.'); // Exibir mensagem de erro
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
              R$ {showSaldo ? `${saldo}` : '***,**'}
            </h1>
            <button className="toggle-saldo-button" onClick={toggleShowSaldo}>
              <img src={showSaldo ? olhoAberto : olhoFechado} alt="Toggle Saldo" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="form-label">
            <label className="valor-label" htmlFor="valor">Valor a adicionar:</label>
            <div className="valor-input-container">
              <span className="valor-prefixo">R$</span>
              <input
                type="text"
                id="valor"
                className="valor-input"
                value={valor}
                onChange={handleChange}
                placeholder="00,00"
              />
            </div>
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