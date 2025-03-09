const express = require('express');
const router = express.Router();
const Event = require('../models/event');

// GET all barracas for a specific event
router.get('/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findById(eventId).select('barracas');
    if (!event) {
      console.log(`Event not found for ID: ${eventId}`); // Log de erro
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event.barracas);
  } catch (error) {
    console.error(`Error retrieving event: ${error.message}`); // Log de erro
    res.status(500).json({ message: error.message });
  }
});

// GET a specific barraca by title
router.get('/:eventId/search', async (req, res) => {
  try {
    const { eventId } = req.params;
    const { title } = req.query;
    const event = await Event.findById(eventId);
    if (!event) {
      console.log(`Event not found for ID: ${eventId}`); // Log de erro
      return res.status(404).json({ message: 'Event not found' });
    }
    const barraca = event.barracas.find(b => b.nome.toLowerCase().includes(title.toLowerCase()));
    if (!barraca) {
      console.log(`Barraca not found with title: ${title}`); // Log de erro
      return res.status(404).json({ message: 'Barraca not found' });
    }
    res.json(barraca);
  } catch (error) {
    console.error(`Error retrieving barraca: ${error.message}`); // Log de erro
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;