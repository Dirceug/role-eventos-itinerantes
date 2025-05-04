import { auth } from '../firebase.js'; // Certifique-se de ajustar o caminho para o arquivo de configuração do Firebase

// Método para renovar o token
export const renewToken = async () => {
  const user = auth.currentUser;
  if (user) {
    const newToken = await user.getIdToken(true); // 'true' força a atualização do token
    console.log('Token renovado:', newToken);
    return newToken;
  }
  throw new Error('Usuário não autenticado para renovar o token.');
};

// Função para fazer requisições ao backend com token atualizado
export const fetchWithToken = async (url, options = {}) => {
  const token = await renewToken(); // Renova o token antes de cada requisição
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  return fetch(url, { ...options, headers });
};