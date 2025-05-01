const express = require('express');
const router = express.Router();
const { criarPedido, atualizarPedido, obterPedido, obterTodosPedidos } = require('../controllers/pedidoControllers'); // Certifique-se de que obterTodosPedidos está sendo importado corretamente

// Criar um novo pedido
router.post('/', criarPedido);

// Atualizar o status do pedido e a última atualização
router.put('/:id', atualizarPedido);

// Obter um pedido específico
router.get('/:id', obterPedido);

// Obter todos os pedidos
router.get('/', obterTodosPedidos); // Certifique-se de que obterTodosPedidos está definido e importado corretamente
console.log("Requisição para obter todos os pedidos recebida no routes")

module.exports = router;