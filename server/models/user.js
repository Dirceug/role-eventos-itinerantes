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

const contaBancariaSchema = new mongoose.Schema({
  banco: String,
  agencia: String,
  conta: String,
});

const userSchema = new mongoose.Schema({
  firebaseUid: { type: String, required: true, unique: true },
  displayName: String,
  email: { type: String, required: true, unique: true },
  photoURL: String,
  emailVerified: Boolean,
  isAnonymous: Boolean,
  cpf: String,
  status: String,
  endereco: {
    type: Map,
    of: enderecoSchema
  },
  contaBancaria: contaBancariaSchema,
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