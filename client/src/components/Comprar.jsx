import React, { useState } from 'react';
import Navbar from './Navbar';
import './Comprar.css';
import BackButton from './BackButton';

const Comprar = ({ user, prato, eventId, barracaId, barracaNome }) => {
  const [quantidade, setQuantidade] = useState(1); // Inicializar com 1 unidade
  const [observacoes, setObservacoes] = useState("");

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

  const handlePedido = () => {
    alert(`${user.displayName} comprou ${quantidade} ${prato.nome} da barraca ${barracaNome} por R$ ${(prato.valor * quantidade).toFixed(2)}`);
  };

  return (
    <div className="container">
      <Navbar eventId={eventId} />
      <div className="comprar-container">
        <BackButton />
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
        <button className="pedido-button" onClick={handlePedido}>Realizar Pedido</button>
      </div>
    </div>
  );
};

export default Comprar;