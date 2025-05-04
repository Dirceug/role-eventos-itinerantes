require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const { generators } = require('openid-client'); // Use generators
const clientPromise = require('./scripts/openidClients'); // Importar clientPromise


const app = express();
const port = process.env.PORT || 5000;

//console.log("AWS_REGION:", process.env.AWS_REGION);
//console.log("COGNITO_USER_POOL_ID:", process.env.COGNITO_USER_POOL_ID);
console.log("COGNITO_CLIENT_ID:", process.env.COGNITO_CLIENT_ID);
console.log("COGNITO_CLIENT_SECRET:", process.env.COGNITO_CLIENT_SECRET);
console.log("COGNITO_REDIRECT_URI:", process.env.COGNITO_REDIRECT_URI);
// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5000',
  'http://18.216.192.230',
  'http://rolesemfila.com.br',
];
app.use(cors());
app.use(express.json());
app.use(session({
  secret: 'some secret',
  resave: false,
  saveUninitialized: false,
}));

// PKCE Setup
(async () => {
  const codeVerifier = generators.codeVerifier(); // Gerar um code_verifier
  const codeChallenge = generators.codeChallenge(codeVerifier); // Gerar o code_challenge

  console.log("Code Verifier:", codeVerifier);
  console.log("Code Challenge:", codeChallenge);

  // Rotas
  const userRoutes = require('./routes/users');
  app.use('/api/users', userRoutes);

  // Rota de login usando Cognito
  app.get('/login', async (req, res) => {
    try {
      const client = await clientPromise; // Garantir que o cliente está inicializado
      if (!client) {
        throw new Error('OpenID client not initialized.');
      }
      const codeVerifier = generators.codeVerifier();
      const codeChallenge = generators.codeChallenge(codeVerifier);
      console.log("codeVerifier: ", codeVerifier)
      console.log("codeChallenge: ", codeChallenge)
      
      req.session.code_verifier = codeVerifier; // Armazenar o code_verifier na sessão

      // Adicione logs para verificar os valores
      console.log("Client ID(login):", client.client_id);
      console.log("Redirect URI(login):", process.env.COGNITO_REDIRECT_URI);
      console.log("Code Challenge(login):", codeChallenge);
      const authorizationUrl = client.authorizationUrl({
        scope: 'email openid phone',
        // code_challenge: codeChallenge,
        // code_challenge_method: 'S256',
        response_type: 'code',
        redirect_uri: process.env.COGNITO_REDIRECT_URI,
      });

      console.log("Generated Authorization URL:(login)", authorizationUrl);
      res.redirect(authorizationUrl);
    } catch (err) {
      console.error('Error generating authorization URL:', err);
      res.status(500).send('Failed to initiate login.');
    }
  });

  // Callback após login
  app.get('/callback', async (req, res) => {
    try {
      const client = await clientPromise; // Garantir que o cliente está inicializado
      const params = client.callbackParams(req); // Obter os parâmetros do callback

      const tokenSet = await client.callback(
        process.env.COGNITO_REDIRECT_URI,
        params,
        { code_verifier: req.session.code_verifier } // Passar o code_verifier
      );

      req.session.tokenSet = tokenSet; // Salvar os tokens na sessão
      req.session.userInfo = await client.userinfo(tokenSet.access_token); // Obter informações do usuário
      res.redirect('/');
    } catch (err) {
      console.error('Callback error:', err);
      res.status(500).send('Authentication failed.');
    }
  });
})();

app.get('/usuarios', async (req, res) => {
  try {
    const client = await clientPromise; // Garantir que o cliente está inicializado
    const params = client.callbackParams(req); // Obter os parâmetros do callback

    console.log("Callback Params:", params); // Log para depuração

    const tokenSet = await client.callback(
      process.env.COGNITO_REDIRECT_URI,
      params,
      { code_verifier: req.session.code_verifier } // Passar o code_verifier
    );

    console.log("Tokens Received:", tokenSet); // Log para depuração
    console.log("ID Token Claims:", tokenSet.claims()); // Log para depuração

    req.session.tokenSet = tokenSet; // Salvar os tokens na sessão
    req.session.userInfo = await client.userinfo(tokenSet.access_token); // Obter informações do usuário
    res.redirect('/'); // Redirecionar para a página inicial após login
  } catch (err) {
    console.error('Usuários error:', err);
    res.status(500).send('Authentication failed.');
  }
});

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'dist')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});