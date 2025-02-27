const express = require('express');
const router = express.Router({ mergeParams: true });
const mongoose = require('mongoose');
const Event = require('../models/event');

// Criar um novo item de cardápio
router.post('/', async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    const barraca = event.barracas.get(req.params.barracaId);
    barraca.cardapio.push(req.body);
    event.barracas.set(req.params.barracaId, barraca);
    await event.save();
    res.status(201).json(barraca);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;