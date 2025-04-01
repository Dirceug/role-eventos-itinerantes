import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './PedidoIndividual.css';
import axios from 'axios';

import pedidoAgendado from '../../img/icones/pedidoAgendado.png';
import pedidoDelivery from '../../img/icones/pedidoDelivery.png';
import pedidoEntregue from '../../img/icones/pedidoEntregue.png';
import pedidoPreparando from '../../img/icones/pedidoPreparando.png';
import pedidoRecebido from '../../img/icones/pedidoRecebido.png';
import pedidoRetirada from '../../img/icones/pedidoRetirada.png';

const statusIconMap = {
  agendado: pedidoAgendado,
  delivery: pedidoDelivery,
  entregue: pedidoEntregue,
  preparando: pedidoPreparando,
  recebido: pedidoRecebido,
  retirada: pedidoRetirada,
};

const PedidoIndividual = ({ pedidoId, tempoPreparo }) => {
  const [pedido, setPedido] = useState(null);

  useEffect(() => {
    const fetchPedido = async () => {
      try {
        const response = await axios.get(`/api/pedidos/${pedidoId}`);
        setPedido(response.data);
      } catch (error) {
        console.error('Erro ao buscar pedido:', error);
      }
    };

    fetchPedido();
  }, [pedidoId]);

  if (!pedido) {
    return <div className="pedido-individual">Carregando...</div>;
  }

  const detalhes = pedido.detalhes ? pedido.detalhes.substring(0, 20) : 'Nenhuma';
  const statusIcon = statusIconMap[pedido.status] || null;

  return (
    <div className="pedido-individual">
      <img src={pedido.foto} alt={pedido.nomePrato} className="pedido-foto" />
      <div className="pedido-info">
        <div className="pedido-header">
          <span className="pedido-numero"><strong>{pedido.numeroPedido}</strong></span>
          <span className="pedido-nome">{pedido.nomePrato}</span>
        </div>
        <div className="pedido-detalhes">
          <span className="pedido-obs">Obs: <span className="pedido-detalhes-texto">{detalhes}</span></span>
          <span className="pedido-tempo">{tempoPreparo}</span>
        </div>
      </div>
      <div className="pedido-status">
        {statusIcon && <img src={statusIcon} alt={pedido.status} className="status-icon" />}
      </div>
    </div>
  );
};

PedidoIndividual.propTypes = {
  pedidoId: PropTypes.string.isRequired,
  tempoPreparo: PropTypes.string.isRequired,
};

export default PedidoIndividual;