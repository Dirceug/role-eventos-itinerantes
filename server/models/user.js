const mongoose = require('mongoose');

const enderecoSchema = new mongoose.Schema({
  apelido: String,
  cep: String,
  rua: String,
  numero: String,
  complemento: String,
  bairro: String,
  cidade: String,
  estado: String,
  status: String,
});

const saldoSchema = new mongoose.Schema({
  valor: Number,
  moeda: String,
  carteiraId: String,
});

const userSchema = new mongoose.Schema({
  firebaseUid: { type: String, required: true, unique: true }, // Adiciona o campo firebaseUid
  displayName: String,
  email: { type: String, required: true, unique: true },
  photoURL: String,
  cpf: String,
  status: String,
  endereco: {
    casa: enderecoSchema,
    trabalho: enderecoSchema,
  },
  contaBancaria: {
    banco: String,
    agencia: String,
    conta: String,
  },
  chavePIX: String,
  saldo: saldoSchema,
  favoritos: [
    {
      eventoId: String,
      titulo: String,
      data: String,
      tipo: String,
    },
  ],
  conexoes: {
    amigos: Map,
    familiares: Map,
  },
});

module.exports = mongoose.model('User', userSchema);