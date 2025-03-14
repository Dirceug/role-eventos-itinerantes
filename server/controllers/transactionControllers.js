const mongoose = require('mongoose');
const Transaction = require('../models/transaction');
const User = require('../models/user'); // Supondo que você tenha um modelo de usuário

// Função para calcular o saldo do usuário
const calcularSaldoUsuario = async (usuarioId) => {
  const transacoes = await Transaction.find({ usuarioId, status: 'concluída' });
  return transacoes.reduce((saldo, transacao) => saldo + transacao.valor, 0);
};

// Obter o saldo do usuário
const obterSaldoUsuario = async (req, res) => {
  try {
    const { usuarioId } = req.params;
    const saldo = await calcularSaldoUsuario(usuarioId);
    res.json({ saldo });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Criar uma nova transação
const criarTransacao = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { usuarioId, eventoId, valor, tipo, descricao } = req.body;

    // Verificar se o usuário existe
    const usuario = await User.findById(usuarioId).session(session);

    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    // Verificar o saldo do usuário
    const saldoAtual = await calcularSaldoUsuario(usuarioId);
    if (saldoAtual + valor < 0) {
      throw new Error('Saldo insuficiente');
    }

    // Criar a transação
    const transacao = new Transaction({
      usuarioId,
      eventoId,
      tipo,
      valor,
      moeda: 'BRL',
      descricao,
      status: 'concluída'
    });

    const novaTransacao = await transacao.save({ session });

    await session.commitTransaction();
    res.status(201).json(novaTransacao);
  } catch (err) {
    await session.abortTransaction();
    res.status(400).json({ message: err.message });
  } finally {
    session.endSession();
  }
};

// Obter todas as transações
const obterTransacoes = async (req, res) => {
  try {
    const transacoes = await Transaction.find();
    res.json(transacoes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  obterTransacoes,
  criarTransacao,
  obterSaldoUsuario,
};