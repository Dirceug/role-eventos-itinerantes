const express = require('express');
const router = express.Router();
const { Amizade } = require('../models/user');
const verifyToken = require('../middleware/authenticateToken'); // Importar o middleware de autenticação

// Middleware para logar todas as requisições
router.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - Body:`, req.body);
  next();
});

// GET all amizades (Proteger a rota)
router.get('/', verifyToken, async (req, res) => {
  try {
    console.log('Fetching all amizades');
    const amizades = await Amizade.find().populate('usuarioId1').populate('usuarioId2');
    res.json(amizades);
  } catch (err) {
    console.error('Error fetching amizades:', err);
    res.status(500).json({ message: err.message });
  }
});

// POST create a new amizade (Proteger a rota)
router.post('/', verifyToken, async (req, res) => {
  const { usuarioId2, status } = req.body;

  try {
    console.log('Creating new amizade for UID:', req.uid);
    const newAmizade = new Amizade({
      usuarioId1: req.userId,
      usuarioId2: usuarioId2,
      status: status
    });

    await newAmizade.save();
    console.log('Amizade created:', newAmizade);
    res.status(201).json(newAmizade);
  } catch (err) {
    console.error('Error creating amizade:', err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;