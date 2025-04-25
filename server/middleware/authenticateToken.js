const admin = require('../firebase'); // Firebase Admin SDK já inicializado

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // Verifica se o cabeçalho Authorization está presente
  if (!authHeader) {
    console.error('[Auth Middleware] Cabeçalho Authorization ausente.');
    return res.status(403).json({ message: 'Cabeçalho Authorization ausente.' });
  }

  // Extrai o token do cabeçalho
  const token = authHeader.split(' ')[1];
  if (!token) {
    console.error('[Auth Middleware] Token Bearer ausente.');
    return res.status(403).json({ message: 'Token ausente no cabeçalho Authorization.' });
  }

  // Verifica o token no Firebase
  admin.auth().verifyIdToken(token)
    .then((decodedToken) => {
      console.log('[Auth Middleware] Token verificado com sucesso:', decodedToken);
      req.uid = decodedToken.uid;
      next();
    })
    .catch((error) => {
      console.error('[Auth Middleware] Falha na verificação do token:', error.message);
      res.status(401).json({ message: 'Token inválido ou expirado.', error: error.message });
    });
};

module.exports = verifyToken;