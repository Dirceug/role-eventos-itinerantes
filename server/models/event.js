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

const barracaSchema = new mongoose.Schema({
  nome: String,
  descricao: String,
  responsavel: {
    nome: String,
    contato: String
  },
  funcionarios: Map,
  cardapio: [cardapioSchema],
  pedidos: Map,
});

const enderecoSchema = new mongoose.Schema({
  apelido: String,
  cep: String,
  logradouro: String,
  numero: String,
  complemento: String,
  bairro: String,
  cidade: String,
  estado: String,
  pontoReferencia: String,
  status: String,
  _id: String
});

const dataEventoSchema = new mongoose.Schema({
  dataAbertura: Date,
  horaAbertura: String,
  dataFechamento: Date,
  horaFechamento: String
});

const eventSchema = new mongoose.Schema({
  nome: String,
  descricao: String,
  data: Date,
  barracas: Map,
  organizadores: [
    {
      id: String,
      nome: String
    }
  ],
  fotoUrl: String,
  dataEvento: [dataEventoSchema],
  numeroFavoritos: Number,
  endereco: enderecoSchema
});

module.exports = mongoose.model('Event', eventSchema);