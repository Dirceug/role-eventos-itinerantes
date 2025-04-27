const admin = require('../firebase'); // Firebase Admin SDK já inicializado

const verifyToken = async (req, res, next) => {
  try {
    // Extrair o token do cabeçalho de autorização
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      console.error('No token provided in Authorization header.');
      return res.status(403).json({ message: 'No token provided.' });
    }

    // Verificar o token usando o Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(token);

    // Adicionar o UID ao objeto de requisição
    req.uid = decodedToken.uid;
    next();
  } catch (error) {
    console.error('Failed to authenticate token:', error);
    res.status(401).json({
      message: 'Failed to authenticate token.',
      error: error.message || 'Unknown error',
    });
  }
};

module.exports = verifyToken;