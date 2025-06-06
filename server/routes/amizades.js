const express = require('express');
const router = express.Router();
const { Amizade } = require('../models/user');
const verifyToken = require('../middleware/authenticateToken'); // Importar o middleware de autenticação
const mongoose = require('mongoose');

// Middleware para logar todas as requisições
router.use((req, res, next) => {
  //console.log(`${req.method} ${req.url} - Body:`, req.body);
  next();
});

// GET all amizades (Proteger a rota)
router.get('/', verifyToken, async (req, res) => {
  try {
    const amizades = await Amizade.find().populate('usuarioId1').populate('usuarioId2');
    res.json(amizades);
  } catch (err) {
    console.error('Error fetching amizades:', err);
    res.status(500).json({ message: err.message });
  }
});

// POST create a new amizade (Proteger a rota)
router.post('/', verifyToken, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { usuarioId2, status } = req.body;

    const newAmizade = new Amizade({
      usuarioId1: req.uid,
      usuarioId2: usuarioId2,
      status: status
    });

    await newAmizade.save({ session });
    await session.commitTransaction();
    session.endSession();
    res.status(201).json(newAmizade);
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error('Error creating amizade:', err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;