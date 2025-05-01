const express = require('express');
const router = express.Router({ mergeParams: true });
const Event = require('../models/event');

// GET cardapio for a specific barraca in an event
router.get('/cardapio', async (req, res) => {
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
    res.json(barraca.cardapio);
  } catch (error) {
    console.error(`Error retrieving barraca: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
});

// GET a specific cardapio item by ID
router.get('/cardapio/:cardapioId', async (req, res) => {
  try {
    const { eventId, barracaId, cardapioId } = req.params;
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    const barraca = event.barracas.id(barracaId);
    if (!barraca) {
      return res.status(404).json({ message: 'Barraca not found' });
    }
    const cardapioItem = barraca.cardapio.id(cardapioId);
    if (!cardapioItem) {
      return res.status(404).json({ message: 'Cardapio item not found' });
    }
    res.json(cardapioItem);
  } catch (error) {
    console.error(`Error retrieving cardapio item: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
});

// GET a specific cardapio item by name
router.get('/cardapio/search', async (req, res) => {
  try {
    const { eventId, barracaId } = req.params;
    const { name } = req.query;
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    const barraca = event.barracas.id(barracaId);
    if (!barraca) {
      return res.status(404).json({ message: 'Barraca not found' });
    }
    const cardapioItem = barraca.cardapio.find(c => c.nome && c.nome.toLowerCase().includes(name.toLowerCase()));
    if (!cardapioItem) {
      return res.status(404).json({ message: 'Cardapio item not found' });
    }
    res.json(cardapioItem);
  } catch (error) {
    console.error(`Error retrieving cardapio item: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;