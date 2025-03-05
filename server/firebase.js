const admin = require('firebase-admin');
const serviceAccount = require('../securityNotes/role-eventos-itinerantes-firebase-adminsdk-fbsvc-8647312e1a.json'); // Substitua pelo caminho correto do seu arquivo de chave privada

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://role-eventos-itinerantes.firebaseio.com'
});

module.exports = admin;