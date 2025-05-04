const express = require('express');
const { Issuer } = require('openid-client');
const router = express.Router();
const { User } = require('../models/user'); // Modelo do MongoDB
const verifyToken = require('../middleware/authenticateToken'); // Middleware para validar tokens
const NodeCache = require("node-cache");

const userCache = new NodeCache({ stdTTL: 600 }); // Cache de usuários com TTL de 10 minutos

// Middleware para logar todas as requisições
router.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  next();
});

// Rota para registrar ou atualizar o usuário no banco de dados
router.post('/register', async (req, res) => {
  const { email, displayName, photoURL } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, displayName, photoURL });
    } else {
      user.displayName = displayName;
      user.photoURL = photoURL;
    }
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ message: 'Error registering user' });
  }
});

// Rota para obter o usuário autenticado
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ message: 'Error fetching user' });
  }
});

// Outras rotas mantidas (GET, POST, etc.)
router.post('/updateAddress', verifyToken, async (req, res) => {
  const { tipo, cep, rua, numero, complemento, bairro, cidade, estado } = req.body;

  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    user.endereco.set(tipo.toLowerCase(), {
      apelido: tipo,
      cep,
      rua,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
      status: 'active',
    });

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error('Error updating address:', error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;