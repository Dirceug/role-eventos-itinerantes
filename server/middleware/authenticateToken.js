const admin = require('../firebase');

const verifyToken = async (req, res, next) => {
  try {
    // Log do cabeçalho Authorization recebido
    console.log('[Middleware] Authorization Header:', req.headers['authorization']);

    // Extrair o token do cabeçalho de autorização
    const token = req.headers['authorization']?.split(' ')[1];
    console.log('[Middleware] Token Extraído:', token); // Log do token extraído

    if (!token) {
      console.error('[Middleware] Nenhum token fornecido no cabeçalho Authorization.');
      return res.status(403).json({ message: 'No token provided.' });
    }

    // Log antes de validar o token
    console.log('[Middleware] Tentando validar o token com Firebase Admin SDK...');

    // Verificar o token usando o Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(token);

    // Log do token decodificado
    console.log('[Middleware] Token Decodificado:', decodedToken);

    // Adicionar o UID ao objeto de requisição
    req.uid = decodedToken.uid;
    console.log('[Middleware] UID do usuário adicionado à requisição:', req.uid);

    next(); // Continua para o próximo middleware ou rota
  } catch (error) {
    // Log detalhado do erro
    console.error('[Middleware] Falha ao autenticar o token:', error.message);
    console.error('[Middleware] Erro completo:', error);

    res.status(401).json({
      message: 'Failed to authenticate token.',
      error: error.message || 'Unknown error',
    });
  }
};

module.exports = verifyToken;