const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  usuarioId: { type: String, required: true, index: true },
  eventoId: { type: String, required: true },
  tipo: { type: String, required: true }, // compra, adição de saldo, retirada de saldo, transferência, etc.
  valor: { type: Number, required: true }, // positivo ou negativo
  moeda: { type: String, required: true },
  dataHora: { type: Date, default: Date.now },
  descricao: { type: String },
  status: { type: String, default: 'pendente' }, // pendente, concluída, cancelada
  transacaoIdExterna: { type: String },
  detalhesAdicionais: mongoose.Schema.Types.Mixed, // campo flexível para informações adicionais
  produto: {
    nome: String,
    id: String,
    valor: Number,
    imagem: String,
    quantidade: Number,
    descricao: String,
  }
});

module.exports = mongoose.model('Transaction', transactionSchema);