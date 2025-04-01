import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { ScaleLoader } from 'react-spinners';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import './Comprar.css';
import UserContext from '../../contexts/UserContext';

const CompraLoader = () => (
  <div className="loader-container">
    <ScaleLoader color="#EE7F43" height={100} radius={15} speedMultiplier={1} width={1} />
  </div>
);

Modal.setAppElement('#root');

const Comprar = ({ isOpen, onRequestClose, user, prato, eventId, barracaId, barracaNome, chaveBarraca }) => {
  const { loadingUser } = useContext(UserContext);
  const [quantidade, setQuantidade] = useState(1);
  const [observacoes, setObservacoes] = useState("");
  const [dataHoraRetirada, setDataHoraRetirada] = useState(""); // Novo campo
  const [showObservacoes, setShowObservacoes] = useState(false); // Controle de visibilidade para observações
  const [showDataHoraRetirada, setShowDataHoraRetirada] = useState(false); // Controle de visibilidade para data/hora de retirada
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleMais = () => {
    if (quantidade < prato.estoque && quantidade < 10) {
      setQuantidade(quantidade + 1);
    }
  };

  const handleMenos = () => {
    if (quantidade > 1) {
      setQuantidade(quantidade - 1);
    }
  };

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
      dataHoraRetirada: dataHoraRetirada || null, // Incluindo novo campo
      tempoPreparo: prato.tempoPreparo,
      status: 'pendente',
      chaveBarraca: chaveBarraca
    };

    console.log('Enviando transação:', transactionData);

    try {
      const response = await axios.post('http://localhost:5000/api/transactions', transactionData, {
        headers: {
          'Authorization': `Bearer ${Cookies.get('authToken')}`,
          'Content-Type': 'application/json'
        }
      });

      toast.success(response.data.message); // Exibir mensagem de sucesso
      setLoading(false);
      onRequestClose();
    } catch (error) {
      console.error('Erro ao enviar pedido:', error);
      toast.error('Erro ao enviar pedido. Tente novamente.'); // Exibir mensagem de erro
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
      shouldCloseOnOverlayClick={true} // Adicionando esta linha para garantir que o modal possa ser fechado ao clicar fora
      className="comprar-modal"
    >
      <div className="modal-content">
        <button className="close-button" onClick={onRequestClose}>X</button>
        <img src={prato.imagem} alt={prato.nome} className="prato-imagem2" />
        <div className="prato-info">
          <h3 className="prato-nome">{prato.nome}</h3>
          <p className="prato-ingredientes">{prato.ingredientes}</p>
          <h3 className="prato-valor">R$ {prato.valor.toFixed(2)}</h3>
        </div>
        <div className="checkbox-container">
          <label>
            <input
              type="checkbox"
              checked={showObservacoes}
              onChange={() => setShowObservacoes(!showObservacoes)}
            />
            Incluir Alterações
          </label>
        </div>
        {showObservacoes && (
          <div className="observacoes">
            <label htmlFor="observacoes">Alterações</label>
            <textarea
              id="observacoes"
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
            />
          </div>
        )}
        <div className="checkbox-container">
          <label>
            <input
              type="checkbox"
              checked={showDataHoraRetirada}
              onChange={() => setShowDataHoraRetirada(!showDataHoraRetirada)}
            />
            Agendar Retirada
          </label>
        </div>
        {showDataHoraRetirada && (
          <div className="data-hora-retirada">
            <label htmlFor="dataHoraRetirada">Data e Hora de Retirada</label>
            <input 
              type="datetime-local" 
              id="dataHoraRetirada" 
              value={dataHoraRetirada} 
              onChange={(e) => setDataHoraRetirada(e.target.value)} 
            />
          </div>
        )}
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