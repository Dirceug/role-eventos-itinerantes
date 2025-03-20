import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { ScaleLoader } from 'react-spinners';
import Cookies from 'js-cookie'; // Certifique-se de importar corretamente a biblioteca js-cookie
import './Comprar.css';
import UserContext from '../contexts/UserContext';

// Componente de loader para exibir enquanto a transação está sendo processada
const CompraLoader = () => (
  <div className="loader-container">
    <ScaleLoader color="#EE7F43" height={100} radius={15} speedMultiplier={1} width={1} />
  </div>
);

// Define o elemento raiz da aplicação para o Modal
Modal.setAppElement('#root');

// Componente principal
const Comprar = ({ isOpen, onRequestClose, user, prato, eventId, barracaId, barracaNome }) => {
  const { loadingUser } = useContext(UserContext);
  const [quantidade, setQuantidade] = useState(1); // Inicializa com 1 unidade
  const [observacoes, setObservacoes] = useState(""); // Estado para armazenar observações
  const [loading, setLoading] = useState(false); // Estado para controlar o estado de carregamento
  const [error, setError] = useState(''); // Estado para armazenar mensagens de erro

  // Função para aumentar a quantidade do prato
  const handleMais = () => {
    if (quantidade < prato.estoque && quantidade < 10) {
      setQuantidade(quantidade + 1);
    }
  };

  // Função para diminuir a quantidade do prato
  const handleMenos = () => {
    if (quantidade > 1) {
      setQuantidade(quantidade - 1);
    }
  };

  // Função para enviar o pedido
  const handlePedido = async (e) => {
    e.preventDefault();
    setLoading(true);

    const transactionData = {
      usuarioId: user._id,
      eventoId: eventId,
      barracaId: barracaId,
      cardapioId: prato._id,
      tipo: 'compra',
      valor: prato.valor * quantidade,
      moeda: 'BRL',
      quantidade: quantidade,
      valorUnidade: prato.valor,
      descricao: prato.ingredientes,
      detalhes: observacoes || null,
      status: 'pendente'
    };

    console.log('Enviando transação:', transactionData);

    try {
      await axios.post('http://localhost:5000/api/transactions', transactionData, {
        headers: {
          'Authorization': `Bearer ${Cookies.get('authToken')}`,
          'Content-Type': 'application/json'
        }
      });

      setLoading(false);
      onRequestClose();
    } catch (error) {
      console.error('Erro ao enviar pedido:', error);
      setError('Erro ao enviar pedido. Tente novamente.');
      setLoading(false);
    }
  };

  if (loadingUser) {
    return <CompraLoader />;
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="comprar-modal"
    >
      <div className="modal-content">
        <button className="close-button" onClick={onRequestClose}>X</button>
        <img src={prato.imagem} alt={prato.nome} className="prato-imagem" />
        <div className="prato-info">
          <h3 className="prato-nome">{prato.nome}</h3>
          <p className="prato-ingredientes">{prato.ingredientes}</p>
          <h3 className="prato-valor">R$ {prato.valor.toFixed(2)}</h3>
        </div>
        <div className="observacoes">
          <label htmlFor="observacoes">Alterações</label>
          <textarea
            id="observacoes"
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
          />
        </div>
        <hr />
        <div className="quantidade-container">
          <h2 className="quantidade-label">Unidades</h2>
          <button className="quantidade-button" onClick={handleMenos} disabled={quantidade <= 1}>-</button>
          <h2 className="quantidade">{quantidade}</h2>
          <button className="quantidade-button" onClick={handleMais} disabled={quantidade >= prato.estoque || quantidade >= 10}>+</button>
        </div>
        <hr />
        <div className="total-container">
          <h2 className="total">Total: R$ {(prato.valor * quantidade).toFixed(2)}</h2>
        </div>
        {error && <p className="error-message">{error}</p>}
        <button className="pedido-button" onClick={handlePedido} disabled={loading}>
          {loading ? (
            <ScaleLoader color="#EE7F43" height={20} radius={10} speedMultiplier={1} width={2} />
          ) : (
            'Realizar Pedido'
          )}
        </button>
      </div>
    </Modal>
  );
};

export default Comprar;