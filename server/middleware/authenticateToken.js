const admin = require('../firebase'); // Firebase Admin SDK já inicializado

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // Verifica se o cabeçalho Authorization está presente
  if (!authHeader) {
    console.error('Authorization header is missing');
    return res.status(403).json({ message: 'No authorization header provided.' });
  }

  // Extrai o token do cabeçalho
  const token = authHeader.split(' ')[1];
  if (!token) {
    console.error('Bearer token is missing');
    return res.status(403).json({ message: 'No token provided in authorization header.' });
  }

  // Verifica o token no Firebase
  admin.auth().verifyIdToken(token)
    .then((decodedToken) => {
      console.log('Token successfully verified:', decodedToken);
      req.uid = decodedToken.uid; // Adiciona o UID do usuário ao objeto req
      next();
    })
    .catch((error) => {
      console.error('Invalid or expired token:', error.message);
      res.status(401).json({ message: 'Failed to authenticate token.', error: error.message });
    });
};

module.exports = verifyToken;