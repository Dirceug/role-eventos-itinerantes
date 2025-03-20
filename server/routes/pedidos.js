const express = require('express');
const router = express.Router();
const { criarPedido, atualizarPedido } = require('../controllers/pedidoControllers');

// Criar um novo pedido
router.post('/', criarPedido);

// Atualizar o status do pedido e a última atualização
router.put('/:id', atualizarPedido);

module.exports = router;