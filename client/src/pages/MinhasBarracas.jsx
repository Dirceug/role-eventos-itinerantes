import React, { useEffect, useState, useContext, lazy, Suspense } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './MinhasBarracas.css';
import Cookies from 'js-cookie';
import UserContext from '../contexts/UserContext';

const Navbar = lazy(() => import('../components/layout/Navbar'));

const MinhasBarracas = () => {
  const { user } = useContext(UserContext); // Contexto para obter informações do usuário
  const [pedidos, setPedidos] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado de carregamento
  const [error, setError] = useState(null); // Estado de erro
  const [searchParams] = useSearchParams();
  const barracaId = searchParams.get('barracaId');
  const navigate = useNavigate(); // Para redirecionar para outro componente

  useEffect(() => {
    if (!barracaId) {
      console.error('Nenhum barracaId foi fornecido na URL');
      setError('Nenhuma barraca associada foi encontrada.');
      setIsLoading(false);
      return;
    }

    const fetchPedidos = async () => {
      const token = Cookies.get('authToken');
      if (!token) {
        console.error('Nenhum token de autenticação encontrado');
        setError('Você não está autenticado. Por favor, faça login novamente.');
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/pedidos?barracaId=${barracaId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`Erro HTTP! status: ${response.status}`);
        }

        const data = await response.json();

        // Verifica se existem pedidos filtrados
        if (data.length === 0) {
          setError('Nenhum pedido encontrado para esta barraca.');
        } else {
          setPedidos(data);
        }
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
        setError('Ocorreu um erro ao buscar os pedidos. Tente novamente mais tarde.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPedidos();
  }, [barracaId]);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const handleViewPedidos = () => {
    console.log()
    navigate(`/pedidos-barracas`); // Redireciona para o componente PedidosBarracas
  };

  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Navbar user={user} />
      <div className="lista-pedidos-container">
        <button className="view-pedidos-button" onClick={handleViewPedidos}>
          Ver Todos os Pedidos
        </button>
        {pedidos.map(pedido => (
          <div key={pedido._id} className="pedido-card">
            <div className="pedido-info">
              <h2>{pedido.descricao}</h2>
              <p><strong>Quantidade:</strong> {pedido.quantidade}</p>
              <p><strong>Valor Total:</strong> R${pedido.valor * pedido.quantidade}</p>
              <p><strong>Status:</strong> {pedido.status}</p>
              <p><strong>Última Atualização:</strong> {new Date(pedido.ultimaAtualizacao).toLocaleString('pt-BR')}</p>
            </div>
          </div>
        ))}
      </div>
    </Suspense>
  );
};

export default MinhasBarracas;