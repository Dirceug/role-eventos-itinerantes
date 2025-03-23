const mongoose = require('mongoose');
const math = require('mathjs');
const Transaction = require('../models/transaction');
const Pedido = require('../models/pedido');
const Evento = require('../models/event');
const { User } = require('../models/user');

// Função para calcular o saldo do usuário
const calcularSaldoUsuario = async (usuarioId) => {
  try {
    const transacoes = await Transaction.find({ usuarioId, status: 'concluída' });
    const saldo = transacoes.reduce((saldo, transacao) => {
      return math.round(math.add(saldo, transacao.valor || 0), 2);
    }, 0);
    console.log('Saldo calculado:', saldo); // Adicione log para depuração
    return saldo;
  } catch (error) {
    console.error('Erro ao calcular saldo do usuário:', error);
    throw error;
  }
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

    // Se a transação for do tipo compra, encontrar o evento e a barraca para atualizar o estoque do cardápio
    let evento;
    if (tipo === 'compra') {
      evento = await Evento.findById(eventoId).session(session);
      if (!evento) {
        throw new Error('Evento não encontrado');
      }

      const barraca = evento.barracas.id(barracaId);
      if (!barraca) {
        throw new Error('Barraca não encontrada');
      }

      const cardapio = barraca.cardapio.id(cardapioId);
      if (!cardapio) {
        throw new Error('Item do cardápio não encontrado');
      }

      if (cardapio.estoque < quantidade) {
        throw new Error('Estoque insuficiente');
      }

      // Atualizar o estoque
      cardapio.estoque -= quantidade;
      await evento.save({ session });

      // Criar o pedido
      const pedido = new Pedido({
        usuarioId,
        eventoId,
        barracaId,
        cardapioId,
        nomePrato: cardapio.nome, // Obtendo o nome do prato
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

      // Mensagem de compra concluída
      message = `Olá ${usuario.displayName}, sua compra de ${quantidade} ${cardapio.nome} no valor de R$ ${math.abs(valorAjustado).toFixed(2)} foi enviada a ${barraca.nome}.`;
    } else {
      // Mensagem de adição de saldo
      message = `Olá ${usuario.displayName}, o saldo de R$ ${math.abs(valorAjustado).toFixed(2)} foi acrescentado ao seu saldo.`;
    }

    // Criar a transação
    const transacao = new Transaction({
      usuarioId,
      eventoId: tipo === 'compra' ? eventoId : null,
      barracaId: tipo === 'compra' ? barracaId : null,
      cardapioId: tipo === 'compra' ? cardapioId : null,
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

    // Atualizar status da transação após salvar
    novaTransacao.status = 'concluída';
    await novaTransacao.save({ session });

    await session.commitTransaction();
    res.status(201).json({ message, transacao: novaTransacao });
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