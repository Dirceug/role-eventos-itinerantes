const crypto = require('crypto');

// Gera os primeiros 4 caracteres (letras maiúsculas e números)
function generateRandomBase() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 4; i++) {
    const randomIndex = crypto.randomInt(0, chars.length); // Gera um número aleatório
    result += chars[randomIndex];
  }
  return result;
}

// Calcula o dígito de verificação usando o algoritmo de Luhn
function calculateLuhnCheckDigit(base) {
  const reversed = base.split('').reverse();
  let sum = 0;

  for (let i = 0; i < reversed.length; i++) {
    let digit = parseInt(reversed[i], 36); // Base 36 para converter letras e números
    if (i % 2 === 0) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }

  const checkDigit = (10 - (sum % 10)) % 10;
  return checkDigit.toString(36).toUpperCase(); // Retorna o dígito em base 36
}

// Gera o identificador completo (4 caracteres + dígito de verificação)
function generateIdentifier() {
  const base = generateRandomBase();
  const checkDigit = calculateLuhnCheckDigit(base);
  return base + checkDigit;
}

// Adiciona hífens ao formato do identificador
function formatIdentifier(identifier) {
  return `${identifier.slice(0, 2)}-${identifier.slice(2, 4)}-${identifier.slice(4)}`;
}


module.exports = { generateIdentifier, calculateLuhnCheckDigit, formatIdentifier };