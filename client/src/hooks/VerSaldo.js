import { useState, useEffect } from 'react';
import axios from 'axios';

const useSaldo = (userId, token) => {
  const [saldo, setSaldo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSaldo = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await axios.get(`${apiUrl}/transactions/saldo/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setSaldo(response.data.saldo);
      } catch (error) {
        console.error('Erro ao buscar saldo:', error);
      }
      setLoading(false);
    };

    if (userId) {
      fetchSaldo();
    }
  }, [userId, token]);

  return { saldo, loading };
};

export default useSaldo;