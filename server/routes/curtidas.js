const express = require('express');
const router = express.Router();
const { User, Curtida } = require('../models/user');
const verifyToken = require('../middleware/authenticateToken'); // Importar o middleware de autenticação
const mongoose = require('mongoose');

// Middleware para logar todas as requisições
router.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - Body:`, req.body);
  next();
});

// GET all curtidas (Proteger a rota)
router.get('/', verifyToken, async (req, res) => {
  try {
    console.log('Fetching all curtidas');
    const eventoId = req.query.eventoId;
    const curtidas = await Curtida.find({ eventoId }).populate('usuarioId').populate('eventoId');
    res.json(curtidas);
  } catch (err) {
    console.error('Error fetching curtidas:', err);
    res.status(500).json({ message: err.message });
  }
});

// POST create a new curtida (Proteger a rota)
router.post('/', verifyToken, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { eventoId } = req.body;
    const uid = req.uid; // Firebase UID
    console.log('Creating new curtida for UID:', uid);

    // Buscar o usuário pelo Firebase UID
    const user = await User.findOne({ firebaseUid: uid });
    if (!user) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'User not found' });
    }

    const newCurtida = new Curtida({
      usuarioId: user._id,
      eventoId: eventoId
    });

    await newCurtida.save({ session });
    await session.commitTransaction();
    session.endSession();

    console.log('Curtida created:', newCurtida);
    res.status(201).json(newCurtida);
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error('Error creating curtida:', err);
    res.status(400).json({ message: err.message });
  }
});

// DELETE remove a curtida (Proteger a rota)
router.delete('/', verifyToken, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { eventoId } = req.body;
    const uid = req.uid; // Firebase UID
    console.log('Removing curtida for UID:', uid);

    // Buscar o usuário pelo Firebase UID
    const user = await User.findOne({ firebaseUid: uid });
    if (!user) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'User not found' });
    }

    const curtida = await Curtida.findOneAndDelete({
      usuarioId: user._id,
      eventoId: eventoId
    }).session(session);

    if (!curtida) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'Curtida not found' });
    }

    await session.commitTransaction();
    session.endSession();

    console.log('Curtida removed:', curtida);
    res.status(200).json({ message: 'Curtida removed' });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error('Error removing curtida:', err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;