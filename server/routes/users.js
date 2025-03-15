const express = require('express');
const admin = require('../firebase'); // Importando a inicialização do Firebase
const router = express.Router();
const { User } = require('../models/user'); // Importando o modelo User corretamente
const verifyToken = require('../middleware/authenticateToken'); // Importar o middleware de autenticação

// Middleware para logar todas as requisições
router.use((req, res, next) => {
  next();
});

// GET all users (Proteger a rota)
router.get('/', verifyToken, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: err.message });
  }
});

// GET user information (Proteger a rota)
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.uid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Error fetching user data', error });
  }
});

// POST create a new user (Registro) (Não proteger a rota)
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
    console.error('Error registering user:', error);
    res.status(400).json({ message: error.message });
  }
});

// POST update user address (Proteger a rota)
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
    console.error('Error updating address:', error);
    res.status(400).json({ message: error.message });
  }
});

// POST update user bank account (Proteger a rota)
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
    console.error('Error updating bank account:', error);
    res.status(400).json({ message: error.message });
  }
});

// POST login a user (Proteger a rota)
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
    console.error('Error logging in user:', error);
    res.status(401).json({ message: 'Token inválido', error: error.message });
  }
});

// POST like an event (Proteger a rota)
router.post('/likeEvent', verifyToken, async (req, res) => {
  const { eventoId, titulo, data, tipo } = req.body;

  try {
    const user = await User.findOne({ firebaseUid: req.uid });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Verifica se o evento já está nos favoritos
    const eventExists = user.favoritos.some(fav => fav.eventoId === eventoId);
    if (eventExists) {
      return res.status(400).json({ message: 'Evento já está nos favoritos' });
    }

    // Adiciona o evento aos favoritos
    user.favoritos.push({ eventoId, titulo, data, tipo });
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error('Error liking event:', error);
    res.status(400).json({ message: error.message });
  }
});

// GET all friends of a user (Proteger a rota)
router.get('/friends', verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.uid });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json(user.conexoes.amigos);
  } catch (error) {
    console.error('Error fetching friends:', error);
    res.status(500).json({ message: 'Error fetching friends', error });
  }
});

module.exports = router;