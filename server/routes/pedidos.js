const express = require('express');
const router = express.Router();
const Pedido = require('../models/pedido');

// Criar um novo pedido
router.post('/', async (req, res) => {
  try {
    const pedido = new Pedido(req.body);
    await pedido.save();
    res.status(201).json(pedido);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;