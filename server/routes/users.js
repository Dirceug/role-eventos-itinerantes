const express = require('express');
const admin = require('../firebase'); // Importando a inicialização do Firebase
const router = express.Router();
const User = require('../models/user');

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create a new user (Registro)
router.post('/register', async (req, res) => {
  const { email, password, displayName } = req.body;

  try {
    // Cria um novo usuário no Firebase Auth
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
      displayName: displayName
    });

    // Adiciona o usuário no banco de dados MongoDB
    const user = new User({
      displayName: displayName,
      email: email,
      firebaseUid: userRecord.uid // Armazena o UID do Firebase Auth
    });

    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST update user address
router.post('/updateAddress', async (req, res) => {
  const { email, tipo, cep, rua, numero, complemento, bairro, cidade, estado } = req.body;

  try {
    // Encontra o usuário pelo email
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Atualiza o endereço do usuário
    user.endereco[tipo.toLowerCase()] = {
      apelido: tipo,
      cep: cep,
      rua: rua,
      numero: numero,
      complemento: complemento,
      bairro: bairro,
      cidade: cidade,
      estado: estado,
      status: 'active'
    };

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST login a user
router.post('/login', async (req, res) => {
  const { idToken } = req.body; // Receber o idToken do frontend

  try {
    // Verifica o token de ID no Firebase Auth
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    // Busca o usuário no banco de dados MongoDB pelo UID do Firebase
    const user = await User.findOne({ firebaseUid: uid });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Usuário autenticado com sucesso
    res.status(200).json({ message: 'Login bem-sucedido', user: user });
  } catch (error) {
    res.status(401).json({ message: 'Token inválido', error: error.message });
  }
});

module.exports = router;