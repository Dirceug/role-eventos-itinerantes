const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
  usuarioId: { type: String, required: true },
  eventoId: { type: String, required: true },
  barracaId: { type: String, required: true },
  cardapioId: { type: String, required: true },
  nomePrato: { type: String, required: true }, // Novo campo
  tipo: { type: String, required: true },
  valor: { type: Number, required: true },
  moeda: { type: String, required: true },
  quantidade: { type: Number, required: true },
  valorUnidade: { type: Number, required: true },
  descricao: { type: String, required: true },
  detalhes: { type: String, required: false },
  status: { 
    type: String, 
    enum: ['pendente', 'agendado', 'preparando', 'pronto', 'enviado', 'entregue'], 
    default: 'pendente' 
  }, // Definição de status
  dataHora: { type: Date, default: Date.now },
  dataHoraRetirada: { type: Date, required: false },
  ultimaAtualizacao: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pedido', pedidoSchema);