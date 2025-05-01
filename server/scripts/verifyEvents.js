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


// Verificar se a chave da barraca é única dentro do evento
router.get('/:eventId/verifyChaveBarraca', async (req, res) => {
  const { eventId } = req.params;
  const { chaveBarraca } = req.query;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }

    const barracaExists = event.barracas.some(b => b.chaveBarraca === chaveBarraca);
    if (barracaExists) {
      return res.status(400).json({ message: 'Chave da barraca já existe neste evento, tente escolher outra', type: 'error', position: 'top-right', autoClose: 15000 });
    }

    res.status(200).json({ message: 'Chave da barraca disponível', type: 'success', position: 'top-right', autoClose: 5000 });
  } catch (error) {
    res.status(500).json({ message: error.message, type: 'error', position: 'top-right', autoClose: 5000 });
  }
});

module.exports = router;