const express = require('express');
const router = express.Router({ mergeParams: true });
const mongoose = require('mongoose');
const Event = require('../models/event');

// Criar uma nova barraca
router.post('/', async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    event.barracas.set(new mongoose.Types.ObjectId().toString(), req.body);
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;