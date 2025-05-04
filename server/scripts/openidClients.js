require('dotenv').config();
const { Issuer } = require('openid-client'); // Importando apenas o necessário

let client; // Variável para armazenar o cliente OpenID

const clientPromise = (async () => {
  try {
    console.log("Cognito Client ID (initial):", process.env.COGNITO_CLIENT_ID);
    console.log("Cognito Client Secret (initial):", process.env.COGNITO_CLIENT_SECRET);

    if (!process.env.COGNITO_CLIENT_ID || process.env.COGNITO_CLIENT_ID.trim() === "") {
      throw new Error("COGNITO_CLIENT_ID is not set or is empty");
    }

    // Descobrir o provedor OpenID
    const issuerConfig = await Issuer.discover(
      `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}/.well-known/openid-configuration`
    );
    //console.log("Issuer discovered:", issuerConfig);

    const discoveryUrl = `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}/.well-known/openid-configuration`;
    console.log("Discovery URL:", discoveryUrl);
    
    // Inicializar o cliente OpenID
    client = new issuerConfig.Client({
      client_id: process.env.COGNITO_CLIENT_ID, // Use o ID do cliente do .env
      client_secret: process.env.COGNITO_CLIENT_SECRET, // Use o segredo do cliente do .env
      redirect_uris: [process.env.COGNITO_REDIRECT_URI], // URL de redirecionamento
      response_types: ['code'], // Tipo de resposta esperado
    });

    console.log("OpenID Client initialized successfully:");
    return client;
  } catch (error) {
    console.error("Error initializing OpenID client:", error);
    throw error;
  }
})();

module.exports = clientPromise;