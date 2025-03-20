const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
  usuarioId: { type: String, required: true },
  eventoId: { type: String, required: true },
  barracaId: { type: String, required: true },
  cardapioId: { type: String, required: true },
  tipo: { type: String, required: true },
  valor: { type: Number, required: true },
  moeda: { type: String, required: true },
  quantidade: { type: Number, required: true },
  valorUnidade: { type: Number, required: true },
  descricao: { type: String, required: true },
  detalhes: { type: String, required: false },
  status: { type: String, default: 'pendente' },
  dataHora: { type: Date, default: Date.now }, // Timestamp do momento em que o pedido é criado
  dataHoraRetirada: { type: Date, required: false }, // Data e hora de retirada
  ultimaAtualizacao: { type: Date, default: Date.now } // Timestamp da última atualização do pedido
});

module.exports = mongoose.model('Pedido', pedidoSchema);