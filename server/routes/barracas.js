const express = require('express');
const router = express.Router({ mergeParams: true });
const Event = require('../models/event');

// GET all barracas for a specific event
router.get('/barracas', async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findById(eventId).select('barracas');
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event.barracas);
  } catch (error) {
    console.error(`Error retrieving event: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
});

// GET a specific barraca by ID
router.get('/barracas/:barracaId', async (req, res) => {
  try {
    const { eventId, barracaId } = req.params;
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    const barraca = event.barracas.id(barracaId);
    if (!barraca) {
      return res.status(404).json({ message: 'Barraca not found' });
    }
    res.json(barraca);
  } catch (error) {
    console.error(`Error retrieving barraca: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
});

// GET a specific barraca by title
router.get('/barracas/search', async (req, res) => {
  try {
    const { eventId } = req.params;
    const { title } = req.query;
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    const barraca = event.barracas.find(b => b.nome && b.nome.toLowerCase().includes(title.toLowerCase()));
    if (!barraca) {
      return res.status(404).json({ message: 'Barraca not found' });
    }
    res.json(barraca);
  } catch (error) {
    console.error(`Error retrieving barraca: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;