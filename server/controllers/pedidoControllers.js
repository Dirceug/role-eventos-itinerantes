const Pedido = require('../models/pedido');

// Criar um novo pedido
const criarPedido = async (req, res) => {
  try {
    const pedido = new Pedido(req.body);
    await pedido.save();
    res.status(201).json(pedido);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Atualizar o status do pedido e o campo de ultimaAtualizacao
const atualizarPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const pedido = await Pedido.findById(id);
    if (!pedido) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }

    pedido.status = status;
    pedido.ultimaAtualizacao = new Date();

    await pedido.save();
    res.json(pedido);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  criarPedido,
  atualizarPedido,
};