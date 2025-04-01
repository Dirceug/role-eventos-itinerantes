const mongoose = require('mongoose');

const funcionarioSchema = new mongoose.Schema({
  nome: String,
  cargo: String,
  uid: String 
});

const cardapioSchema = new mongoose.Schema({
  nome: String,
  id: String,
  ingredientes: String,
  valor: Number,
  imagem: String,
  estoque: Number,
  status: String,
  tempoPreparo: Number 
});

const barracaSchema = new mongoose.Schema({
  responsavel: {
    nome: String,
    contato: String,
    uid: String 
  },
  status: String,
  nome: String,
  descricao: String,
  // chaveBarraca: { 
  //   type: String, 
  //   required: true, 
  //   match: /^[A-Z0-9]{3,6}$/
  // },
  funcionarios: {
    type: Map,
    of: funcionarioSchema
  },
  cardapio: [cardapioSchema]
});

const eventSchema = new mongoose.Schema({
  nome: String,
  descricao: String,
  data: Date,
  barracas: [barracaSchema],
  organizadores: [{
    uid: String,
    nome: String,
    cargo: String,
    contato: String
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

eventSchema.index({ 'barracas.chaveBarraca': 1, _id: 1 }, { unique: true });
eventSchema.index({ data: 1 });
eventSchema.index({ 'endereco.apelido': 1 });
eventSchema.index({ 'endereco.cidade': 1 });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;