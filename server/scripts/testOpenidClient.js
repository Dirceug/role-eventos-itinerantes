const { randomPKCECodeVerifier, randomState } = require('openid-client');

// Gerar valores PKCE e estado
const codeVerifier = randomPKCECodeVerifier();
const state = randomState();

console.log('Code Verifier:', codeVerifier);
console.log('State:', state);