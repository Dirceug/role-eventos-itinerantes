const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
  id: String,
  numero: Number,
  senha: String,
  produtos: [
    {
      idProduto: String,
      quantidade: Number,
    },
  ],
  hora: Date,
  status: String,
  cliente: {
    nome: String,
  },
});

module.exports = mongoose.model('Pedido', pedidoSchema);