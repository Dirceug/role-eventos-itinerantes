const mongoose = require('mongoose');
const Transaction = require('../models/transaction');
const Pedido = require('../models/pedido');
const { User } = require('../models/user');

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

// Criar uma nova transação e pedido
const criarTransacao = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    console.log('Requisição recebida para criar transação:', req.body);

    const {
      usuarioId,
      eventoId,
      barracaId,
      cardapioId,
      tipo,
      valor,
      moeda,
      quantidade,
      valorUnidade,
      descricao,
      detalhes,
      dataHoraRetirada
    } = req.body;

    // Verificar se o usuário existe
    const usuario = await User.findById(usuarioId).session(session);

    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    // Verificar o saldo do usuário
    const saldoAtual = await calcularSaldoUsuario(usuarioId);
    console.log('Saldo atual do usuário:', saldoAtual);

    // Ajustar o valor para transações de compra
    const valorAjustado = tipo === 'compra' ? -Math.abs(valor) : valor;

    if (saldoAtual + valorAjustado < 0) {
      console.error('Saldo insuficiente:', { saldoAtual, valorAjustado });
      throw new Error('Saldo insuficiente');
    }

    // Verificar se a data e hora de retirada é maior que a data e hora atual
    if (dataHoraRetirada && new Date(dataHoraRetirada) <= new Date()) {
      throw new Error('A data e hora de retirada deve ser maior que a data e hora atual');
    }

    // Criar a transação
    const transacao = new Transaction({
      usuarioId,
      eventoId,
      barracaId,
      cardapioId,
      tipo,
      valor: valorAjustado,
      moeda,
      quantidade,
      valorUnidade,
      descricao,
      detalhes,
      status: 'pendente',
      dataHoraRetirada
    });

    const novaTransacao = await transacao.save({ session });
    console.log('Transação criada:', novaTransacao);

    // Criar um pedido se a transação for do tipo compra
    if (tipo === 'compra') {
      const pedido = new Pedido({
        usuarioId,
        eventoId,
        barracaId,
        cardapioId,
        tipo,
        valor: valorAjustado,
        moeda,
        quantidade,
        valorUnidade,
        descricao,
        detalhes,
        status: 'pendente',
        dataHoraRetirada
      });

      await pedido.save({ session });
      console.log('Pedido criado:', pedido);
    }

    // Atualizar status da transação após salvar
    novaTransacao.status = 'concluída';
    await novaTransacao.save({ session });

    await session.commitTransaction();
    res.status(201).json(novaTransacao);
  } catch (err) {
    await session.abortTransaction();
    console.error('Erro ao criar transação:', err.message);
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