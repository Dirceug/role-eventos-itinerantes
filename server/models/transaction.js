const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  usuarioId: { type: String, required: true, index: true },
  eventoId: { type: String, required: false },
  barracaId: { type: String, required: false },
  cardapioId: { type: String, required: false },
  tipo: { type: String, required: true }, // compra, adição de saldo, retirada de saldo, transferência, etc.
  valor: { type: Number, required: true }, // positivo ou negativo
  moeda: { type: String, required: true },
  dataHora: { type: Date, default: Date.now }, // Timestamp do momento em que a transação é criada
  descricao: { type: String },
  status: { type: String, default: 'pendente' }, // pendente, concluída, cancelada
  quantidade: { type: Number, required: false },
  valorUnidade: { type: Number, required: false },
  detalhes: { type: String, required: false },
  dataHoraRetirada: { type: Date, required: false } // Data e hora de retirada
});

module.exports = mongoose.model('Transaction', transactionSchema);