const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const verifyToken = require('../middleware/authenticateToken');

// Middleware para logar todas as requisições
router.use((req, res, next) => {
  next();
});
// GET all events (Proteger a rota)
router.get('/', verifyToken, async (req, res) => {
  try {
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
  const { nome, descricao, data, endereco, dataEvento, organizadores, status } = req.body;

    // Validação para cada barraca
    for (const barraca of barracas) {
      if (!barraca.nome || !barraca.descricao) {
        return res.status(400).json({ message: 'Cada barraca deve ter um nome e uma descrição.' });
      }
    }
  const event = new Event({
    nome,
    descricao,
    data,
    endereco,
    dataEvento,
    barracas,
    organizadores,
    status,
    fotoUrl: ""
  });

  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (err) {
    console.error('Error creating event:', err);
    res.status(400).json({ message: err.message });
  }
});

// Adicionar novos organizadores a um evento
router.put('/:eventId/organizadores', verifyToken, async (req, res) => {
  const { eventId } = req.params;
  const { organizadores } = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Evento não encontrado.' });
    }

    // Validação dos organizadores
    const validOrganizadores = organizadores.filter(org => org.status === 'Ativo' && org.emailVerified);
    if (validOrganizadores.length === 0) {
      return res.status(400).json({ message: 'Nenhum organizador válido encontrado.' });
    }

    event.organizadores.push(...validOrganizadores);
    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (err) {
    console.error('Erro ao adicionar organizadores:', err);
    res.status(500).json({ message: err.message });
  }
});

// Editar dados de um organizador
router.put('/:eventId/organizadores/:organizadorId', verifyToken, async (req, res) => {
  const { eventId, organizadorId } = req.params;
  const updates = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Evento não encontrado.' });
    }

    const organizador = event.organizadores.id(organizadorId);
    if (!organizador) {
      return res.status(404).json({ message: 'Organizador não encontrado.' });
    }

    Object.assign(organizador, updates); // Atualiza os campos
    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (err) {
    console.error('Erro ao editar organizador:', err);
    res.status(500).json({ message: err.message });
  }
});

// Apagar organizador
router.delete('/:eventId/organizadores/:organizadorId', verifyToken, async (req, res) => {
  const { eventId, organizadorId } = req.params;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Evento não encontrado.' });
    }

    event.organizadores.id(organizadorId).remove();
    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (err) {
    console.error('Erro ao remover organizador:', err);
    res.status(500).json({ message: err.message });
  }
});

// Adicionar nova barraca
router.put('/:eventId/barracas', verifyToken, async (req, res) => {
  const { eventId } = req.params;
  const { barracas } = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Evento não encontrado.' });
    }

    event.barracas.push(...barracas);
    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (err) {
    console.error('Erro ao adicionar barracas:', err);
    res.status(500).json({ message: err.message });
  }
});

// Editar dados da barraca
router.put('/:eventId/barracas/:barracaId', verifyToken, async (req, res) => {
  const { eventId, barracaId } = req.params;
  const updates = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Evento não encontrado.' });
    }

    const barraca = event.barracas.id(barracaId);
    if (!barraca) {
      return res.status(404).json({ message: 'Barraca não encontrada.' });
    }

    Object.assign(barraca, updates);
    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (err) {
    console.error('Erro ao editar barraca:', err);
    res.status(500).json({ message: err.message });
  }
});

// Adicionar prato no cardápio de uma barraca
router.put('/:eventId/barracas/:barracaId/cardapios', verifyToken, async (req, res) => {
  const { eventId, barracaId } = req.params;
  const { cardapios } = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Evento não encontrado.' });
    }

    const barraca = event.barracas.id(barracaId);
    if (!barraca) {
      return res.status(404).json({ message: 'Barraca não encontrada.' });
    }

    barraca.cardapio.push(...cardapios);
    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (err) {
    console.error('Erro ao adicionar pratos ao cardápio:', err);
    res.status(500).json({ message: err.message });
  }
});

// Editar prato no cardápio de uma barraca
router.put('/:eventId/barracas/:barracaId/cardapios/:pratoId', verifyToken, async (req, res) => {
  const { eventId, barracaId, pratoId } = req.params;
  const updates = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Evento não encontrado.' });
    }

    const barraca = event.barracas.id(barracaId);
    if (!barraca) {
      return res.status(404).json({ message: 'Barraca não encontrada.' });
    }

    const prato = barraca.cardapio.id(pratoId);
    if (!prato) {
      return res.status(404).json({ message: 'Prato não encontrado.' });
    }

    Object.assign(prato, updates);
    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (err) {
    console.error('Erro ao editar prato do cardápio:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;