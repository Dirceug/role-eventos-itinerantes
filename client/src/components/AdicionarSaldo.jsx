import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdicionarSaldo.css';

const AdicionarSaldo = ({ user, onClose }) => {
  const [saldo, setSaldo] = useState(0.00);
  const [valor, setValor] = useState('');

  useEffect(() => {
    const fetchSaldo = async () => {
      try {
        const response = await axios.get(`/api/users/${user._id}/saldo`);
        // Verifique se o saldo é um número e defina o valor padrão se não for
        const saldoObtido = response.data.saldo;
        setSaldo(isNaN(saldoObtido) ? 0.00 : saldoObtido);
      } catch (error) {
        console.error('Erro ao buscar saldo:', error);
        setSaldo(0.00); // Defina o valor padrão em caso de erro
      }
    };

    fetchSaldo();
  }, [user._id]);

  const handleValorChange = (e) => {
    const value = e.target.value.replace(/[^\d.,]/g, '').replace(',', '.');
    setValor(value);
  };

  const handleAdicionarSaldo = async () => {
    try {
      const novoValor = parseFloat(valor);
      if (isNaN(novoValor) || novoValor <= 0) {
        alert('Por favor, insira um valor válido.');
        return;
      }

      await axios.post('/api/transactions', {
        usuarioId: user._id,
        eventoId: null,
        tipo: 'adição de saldo',
        valor: novoValor,
        moeda: 'BRL',
        descricao: 'Adição de saldo pelo usuário',
        status: 'concluída'
      });

      setSaldo(saldo + novoValor);
      setValor('');
      alert('Saldo adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar saldo:', error);
      alert('Ocorreu um erro ao adicionar saldo. Tente novamente.');
    }
  };

  return (
    <div className="adicionar-saldo-container">
      <h3 className="username">{user.displayName}</h3>
      <h1 className="saldo">R$ {saldo.toFixed(2)}</h1>
      <div className="input-container">
        <label htmlFor="valor">Valor a adicionar</label>
        <input
          type="text"
          id="valor"
          value={valor}
          onChange={handleValorChange}
          placeholder="R$ 0,00"
        />
        <button onClick={handleAdicionarSaldo}>Adicionar Saldo</button>
        <button onClick={onClose}>Voltar</button>
      </div>
    </div>
  );
};

export default AdicionarSaldo;