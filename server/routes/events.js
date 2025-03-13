const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const verifyToken = require('../middleware/authenticateToken'); // Importar o middleware de autenticação
const mongoose = require('mongoose');

// Middleware para logar todas as requisições
router.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - Body:`, req.body);
  next();
});

// GET all events (Proteger a rota)
router.get('/', verifyToken, async (req, res) => {
  try {
    console.log('Fetching all events');
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({ message: err.message });
  }
});

// GET specific event by ID (Proteger a rota)
router.get('/:id', verifyToken, async (req, res) => {
  try {
    console.log('Fetching event by ID:', req.params.id);
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (err) {
    console.error('Error fetching event:', err);
    res.status(500).json({ message: err.message });
  }
});

// POST create a new event (Proteger a rota)
router.post('/', verifyToken, async (req, res) => {
  const event = new Event(req.body);
  try {
    console.log('Creating new event:', req.body);
    const newEvent = await event.save();
    console.log('Event created:', newEvent);
    res.status(201).json(newEvent);
  } catch (err) {
    console.error('Error creating event:', err);
    res.status(400).json({ message: err.message });
  }
});

// POST like an event
router.post('/:id/like', verifyToken, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { userId } = req.body;
    console.log('Liking event ID:', req.params.id, 'by user ID:', userId);
    const event = await Event.findById(req.params.id).session(session);

    if (!event) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'Event not found' });
    }

    // Adicionar a lógica para verificar se o usuário já curtiu o evento aqui, se necessário

    event.numeroFavoritos += 1;
    await event.save({ session });

    await session.commitTransaction();
    session.endSession();

    console.log('Event liked:', event);
    res.status(200).json(event);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Error liking event:', error);
    res.status(500).json({ message: 'Error liking event', error });
  }
});

module.exports = router;