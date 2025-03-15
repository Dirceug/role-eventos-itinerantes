const express = require('express');
const router = express.Router();
const { obterTransacoes, criarTransacao, obterSaldoUsuario } = require('../controllers/transactionControllers.js');

// GET all transactions
router.get('/', obterTransacoes);

// GET user saldo
router.get('/saldo/:usuarioId', obterSaldoUsuario);

// POST create a new transaction
router.post('/', criarTransacao);

module.exports = router;