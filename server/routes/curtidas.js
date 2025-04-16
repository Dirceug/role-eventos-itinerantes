const express = require('express');
const router = express.Router();
const { User, Curtida } = require('../models/user');
const verifyToken = require('../middleware/authenticateToken'); // Importar o middleware de autenticação
const mongoose = require('mongoose');

// Middleware para logar todas as requisições
router.use((req, res, next) => {
  next();
});

// GET all curtidas for an event and user status (Proteger a rota)
router.get('/', verifyToken, async (req, res) => {
  try {
    const eventoId = req.query.eventoId;

    if (!eventoId) {
      return res.status(400).json({ message: 'EventoId is required' });
    }

    // Buscar todas as curtidas para o evento
    const curtidas = await Curtida.find({ eventoId });
    const totalCurtidas = curtidas.length;

    // Verificar se o usuário atual curtiu o evento
    const uid = req.uid; // Firebase UID
    const user = await User.findOne({ firebaseUid: uid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userLiked = curtidas.some(curtida => curtida.usuarioId.toString() === user._id.toString());

    res.json({ liked: userLiked, likesCount: totalCurtidas });
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

    // Verificar parâmetros
    if (!eventoId) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: 'EventoId is required' });
    }

    // Buscar o usuário pelo Firebase UID
    const user = await User.findOne({ firebaseUid: uid });
    if (!user) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'User not found' });
    }

    // Verificar se o usuário já curtiu o evento
    const existingCurtida = await Curtida.findOne({ usuarioId: user._id, eventoId });
    if (existingCurtida) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: 'User already liked this event' });
    }

    // Criar nova curtida
    const newCurtida = new Curtida({
      usuarioId: user._id,
      eventoId: eventoId
    });

    await newCurtida.save({ session });
    await session.commitTransaction();
    session.endSession();

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

    // Verificar parâmetros
    if (!eventoId) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: 'EventoId is required' });
    }

    // Buscar o usuário pelo Firebase UID
    const user = await User.findOne({ firebaseUid: uid });
    if (!user) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'User not found' });
    }

    // Remover curtida
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

    res.status(200).json({ message: 'Curtida removed' });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error('Error removing curtida:', err);
    res.status(400).json({ message: err.message });
  }
});

// GET /curtidas/status (Verifica status de curtida para um evento)
router.get('/status', verifyToken, async (req, res) => {
  try {
    const { eventoId } = req.query;

    if (!eventoId) {
      return res.status(400).json({ message: 'EventoId is required' });
    }

    const uid = req.uid; // Firebase UID
    const user = await User.findOne({ firebaseUid: uid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const curtidas = await Curtida.find({ eventoId });
    const userLiked = curtidas.some(curtida => curtida.usuarioId.toString() === user._id.toString());
    const likesCount = curtidas.length;

    res.json({ liked: userLiked, likesCount });
  } catch (err) {
    console.error('Error fetching curtida status:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;