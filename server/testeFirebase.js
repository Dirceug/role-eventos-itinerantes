require('dotenv').config();
const admin = require('firebase-admin');

const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : 'CHAVE_PRIVADA_NÃO_DEFINIDA',
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
};

// Validação das credenciais
if (!serviceAccount.project_id) {
  throw new Error('FIREBASE_PROJECT_ID não está configurado nas variáveis de ambiente.');
}
if (!serviceAccount.private_key || serviceAccount.private_key === 'CHAVE_PRIVADA_NÃO_DEFINIDA') {
  throw new Error('FIREBASE_PRIVATE_KEY não está configurado ou está malformado.');
}
if (!serviceAccount.client_email) {
  throw new Error('FIREBASE_CLIENT_EMAIL não está configurado nas variáveis de ambiente.');
}

console.log('FIREBASE_PROJECT_ID:', process.env.FIREBASE_PROJECT_ID);
console.log('FIREBASE_PRIVATE_KEY:', process.env.FIREBASE_PRIVATE_KEY ? 'Chave privada carregada' : 'Chave privada não carregada');
console.log('FIREBASE_CLIENT_EMAIL:', process.env.FIREBASE_CLIENT_EMAIL);


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://role-eventos-itinerantes.firebaseio.com'
});

console.log('Firebase inicializado com sucesso!');