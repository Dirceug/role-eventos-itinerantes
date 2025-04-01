const mongoose = require('mongoose');
const Pedido = require('../models/pedido');
const Event = require('../models/event');

const criarPedido = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      usuarioId,
      eventoId,
      barracaId,
      cardapioId,
      quantidade,
      valorUnidade,
      descricao,
      detalhes,
      dataHoraRetirada,
      foto // Novo campo foto
    } = req.body;

    const evento = await Event.findById(eventoId).session(session);
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

    cardapio.estoque -= quantidade;
    await evento.save({ session });

    const contadorBarraca = await ContadorBarraca.findOneAndUpdate(
      { barracaId: barracaId },
      { $inc: { sequencia: 1 } },
      { new: true, upsert: true }
    ).session(session);

    let numeroPedidoBarraca = contadorBarraca.sequencia;
    if (contadorBarraca.sequencia > 9999) {
      contadorBarraca.sequencia = 1;
      await contadorBarraca.save({ session });
      numeroPedidoBarraca = 1;
    }

    const numeroFormatado = numeroPedidoBarraca.toString().padStart(4, '0');
    const numeroPedido = `${barraca.chaveBarraca}-${numeroFormatado}`;

    const pedido = new Pedido({
      usuarioId,
      eventoId,
      barracaId,
      cardapioId,
      nomePrato: cardapio.nome,
      tipo: 'compra',
      valor: valorUnidade * quantidade,
      moeda: 'BRL',
      quantidade,
      valorUnidade,
      descricao,
      detalhes,
      status: 'pendente',
      dataHoraRetirada,
      numeroPedido,
      tempoPreparo: cardapio.tempoPreparo,
      historicoStatus: [{ status: 'pendente' }],
      foto
    });

    await pedido.save({ session });

    await session.commitTransaction();
    res.status(201).json(pedido);
  } catch (err) {
    await session.abortTransaction();
    res.status(400).json({ message: err.message });
  } finally {
    session.endSession();
  }
};

const atualizarPedido = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const pedido = await Pedido.findById(id);
    if (!pedido) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }

    pedido.status = status;
    pedido.ultimaAtualizacao = new Date();
    pedido.historicoStatus.push({ status });

    await pedido.save();
    res.status(200).json(pedido);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Controlador para obter um pedido específico
const obterPedido = async (req, res) => {
  const { id } = req.params;

  try {
    const pedido = await Pedido.findById(id);
    if (!pedido) {
      console.error('Pedido não encontrado:', id);
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }
    console.log('Pedido encontrado:', pedido);
    res.status(200).json(pedido);
  } catch (err) {
    console.error('Erro ao buscar pedido:', err.message);
    res.status(400).json({ message: err.message });
  }
};

// Adicionar função para obter todos os pedidos
const obterTodosPedidos = async (req, res) => {
  try {
    console.log('Requisição para obter todos os pedidos recebida');
    const pedidos = await Pedido.find();
    console.log('Pedidos encontrados:', pedidos);
    res.status(200).json(pedidos);
  } catch (err) {
    console.error('Erro ao buscar pedidos:', err.message);
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  criarPedido,
  atualizarPedido,
  obterPedido,
  obterTodosPedidos
};