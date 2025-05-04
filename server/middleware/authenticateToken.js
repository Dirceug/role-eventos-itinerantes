const clientPromise = require('../scripts/openidClients.js'); // Importar o clientPromise do arquivo separado

const authenticateToken = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const initializedClient = await clientPromise; // Aguarda a inicialização do cliente
    const userInfo = await initializedClient.userinfo(token); // Obtém informações do usuário
    req.user = userInfo; // Armazena as informações do usuário na requisição
    next(); // Continua para o próximo middleware ou rota
  } catch (err) {
    console.error('Authentication error:', err);
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authenticateToken;