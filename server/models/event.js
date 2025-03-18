const mongoose = require('mongoose');

const barracaSchema = new mongoose.Schema({
  responsavel: {
    nome: String,
    contato: String
  },
  status: String,
  nome: String,
  descricao: String,
  funcionarios: {
    type: Map,
    of: new mongoose.Schema({
      nome: String,
      cargo: String
    })
  },
  cardapio: [{
    nome: String,
    id: String,
    ingredientes: String,
    valor: Number,
    imagem: String,
    estoque: Number,
    status: String
  }]
});

const eventSchema = new mongoose.Schema({
  nome: String,
  descricao: String,
  data: Date,
  barracas: [barracaSchema],
  organizadores: [{
    id: String,
    nome: String
  }],
  fotoUrl: String,
  dataEvento: [{
    dataAbertura: Date,
    horaAbertura: String,
    dataFechamento: Date,
    horaFechamento: String
  }],
  numeroFavoritos: Number,
  endereco: {
    apelido: String,
    cep: String,
    logradouro: String,
    numero: String,
    complemento: String,
    bairro: String,
    cidade: String,
    estado: String,
    pontoReferencia: String,
    status: String
  },
  status: String
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;