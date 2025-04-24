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

const favoritosSchema = new mongoose.Schema({
  eventoId: String,
  titulo: String,
  data: String,
  tipo: String,
});

const curtidaSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  eventoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' }
});

const amizadeSchema = new mongoose.Schema({
  usuarioId1: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  usuarioId2: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['pendente', 'aceito', 'superAmigo', 'cancelado'] }
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
  identifier: { type: String, required: true, unique: true }, // Novo campo para o identificador
  endereco: {
    type: Map,
    of: enderecoSchema
  },
  contaBancaria: contaBancariaSchema,
  chavePIX: String,
  saldo: saldoSchema,
  favoritos: [favoritosSchema],
  conexoes: {
    amigos: Map,
    familiares: Map,
  },
});

// Adicionando índices para melhorar buscas frequentes
//userSchema.index({ _id: 1 });
//userSchema.index({ identifier: 1 });

const User = mongoose.model('User', userSchema);
const Curtida = mongoose.model('Curtida', curtidaSchema);
const Amizade = mongoose.model('Amizade', amizadeSchema);

module.exports = { User, Curtida, Amizade };