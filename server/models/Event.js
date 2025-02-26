const mongoose = require('mongoose');

const cardapioSchema = new mongoose.Schema({
  nome: String,
  id: String,
  ingredientes: String,
  valor: Number,
  imagem: String,
  estoque: Number,
  status: String,
});

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

const barracaSchema = new mongoose.Schema({
  nome: String,
  descricao: String,
  responsavel: Map,
  funcionarios: Map,
  cardapio: [cardapioSchema],
  pedidos: Map,
});

const eventSchema = new mongoose.Schema({
  nome: String,
  descricao: String,
  data: Date,
  barracas: Map,
});

module.exports = mongoose.model('Event', eventSchema);