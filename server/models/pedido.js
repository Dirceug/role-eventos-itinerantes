const mongoose = require('mongoose');

const statusHistoricoSchema = new mongoose.Schema({
  status: { 
    type: String, 
    enum: ['pendente', 'agendado', 'preparando', 'pronto', 'enviado', 'entregue'], 
    required: true 
  },
  dataHora: { type: Date, default: Date.now }
});

const pedidoSchema = new mongoose.Schema({
  usuarioId: { type: String, required: true, index: true },
  eventoId: { type: String, required: true },
  barracaId: { type: String, required: true, index: true },
  cardapioId: { type: String, required: true },
  nomePrato: { type: String, required: true },
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
  },
  dataHora: { type: Date, default: Date.now },
  dataHoraRetirada: { type: Date, required: false },
  ultimaAtualizacao: { type: Date, default: Date.now },
  numeroPedido: { type: String, required: true, unique: true },
  tempoPreparo: { type: Number, required: false },
  historicoStatus: [statusHistoricoSchema], 
  foto: { type: String, required: false }
});

//pedidoSchema.index({ numeroPedido: 1 });
pedidoSchema.index({ usuarioId: 1, status: 1 });
pedidoSchema.index({ barracaId: 1, status: 1 });

module.exports = mongoose.model('Pedido', pedidoSchema);