const mongoose = require('mongoose');

const cardapioSchema = new mongoose.Schema({
  nome: String,
  id: String,
  ingredientes: String,
  valor: Number,
  imagem: String,
  estoque: Number,
  status: { type: String, default: "ativo" },
});

const barracaSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nome: String,
  descricao: String,
  responsavel: {
    nome: String,
    contato: String
  },
  funcionarios: Map,
  cardapio: [cardapioSchema],
  pedidos: Map,
  status: { type: String, default: "ativo" },
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
  barracas: [barracaSchema],
  organizadores: [
    {
      id: String,
      nome: String
    }
  ],
  fotoUrl: String,
  dataEvento: [dataEventoSchema],
  numeroFavoritos: Number,
  endereco: enderecoSchema,
  status: { type: String, default: "ativo" },
});

module.exports = mongoose.model('Event', eventSchema);