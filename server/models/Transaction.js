const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  usuarioId: String,
  saldo: {
    valor: Number,
    moeda: String,
    status: String,
  },
  tipo: String,
  detalhes: mongoose.Schema.Types.Mixed,
  dataHora: Date,
});

module.exports = mongoose.model('Transaction', transactionSchema);