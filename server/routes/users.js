const express = require('express');
const admin = require('../firebase'); // Importando a inicialização do Firebase
const router = express.Router();
const User = require('../models/user');

// Middleware para verificar o token JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(403).json({ message: 'No token provided.' });
  }

  admin.auth().verifyIdToken(token)
    .then((decodedToken) => {
      req.uid = decodedToken.uid;
      next();
    })
    .catch((error) => {
      res.status(401).json({ message: 'Failed to authenticate token.', error });
    });
};

// GET all users (This route should be protected, but for the example it's open)
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET user information
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.uid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user data', error });
  }
});

// POST create a new user (Registro)
router.post('/register', async (req, res) => {
  const { displayName, email, photoURL, firebaseUid, emailVerified, isAnonymous } = req.body;

  try {
    // Verifica se o usuário já existe no banco de dados
    let user = await User.findOne({ email: email });
    if (!user) {
      // Adiciona o usuário no banco de dados MongoDB
      user = new User({
        displayName: displayName,
        email: email,
        photoURL: photoURL,
        firebaseUid: firebaseUid,
        emailVerified: emailVerified,
        isAnonymous: isAnonymous
      });

      const newUser = await user.save();
      return res.status(201).json(newUser);
    } else {
      // Se o usuário já existe, atualize os detalhes
      user.displayName = displayName;
      user.photoURL = photoURL;
      user.firebaseUid = firebaseUid;
      user.emailVerified = emailVerified;
      user.isAnonymous = isAnonymous;

      const updatedUser = await user.save();
      return res.status(200).json(updatedUser);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST update user address
router.post('/updateAddress', verifyToken, async (req, res) => {
  const { tipo, cep, rua, numero, complemento, bairro, cidade, estado } = req.body;

  try {
    // Encontra o usuário pelo UID do Firebase
    const user = await User.findOne({ firebaseUid: req.uid });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Atualiza o endereço do usuário
    user.endereco.set(tipo.toLowerCase(), {
      apelido: tipo,
      cep: cep,
      rua: rua,
      numero: numero,
      complemento: complemento,
      bairro: bairro,
      cidade: cidade,
      estado: estado,
      status: 'active'
    });

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST update user bank account
router.post('/updateBankAccount', verifyToken, async (req, res) => {
  const { banco, agencia, conta } = req.body;

  try {
    // Encontra o usuário pelo UID do Firebase
    const user = await User.findOne({ firebaseUid: req.uid });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Atualiza os dados bancários do usuário
    user.contaBancaria = {
      banco: banco,
      agencia: agencia,
      conta: conta
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