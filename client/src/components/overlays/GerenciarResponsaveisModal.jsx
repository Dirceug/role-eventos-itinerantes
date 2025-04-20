import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Cookies from 'js-cookie';
import './GerenciarResponsaveisModal.css';

Modal.setAppElement('#root');

const GerenciarResponsaveisModal = ({ isOpen, onRequestClose, eventId, organizadores }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async (query) => {
    if (query.length !== 5) {
      return;
    }

    setLoading(true);
    try {
      const token = Cookies.get('authToken');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/search?identifier=${query}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setUsers(data || []);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInativarOrganizador = async (organizadorId) => {
    try {
      const token = Cookies.get('authToken');
      await fetch(`${import.meta.env.VITE_API_URL}/events/${eventId}/organizadores/${organizadorId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      alert('Organizador inativado com sucesso.');
      onRequestClose(); // Fecha o modal após a operação
    } catch (error) {
      console.error('Erro ao inativar organizador:', error);
    }
  };

  const handleAdicionarOrganizador = async (user) => {
    const novoOrganizador = {
      nome: user.displayName,
      email: user.email,
      fotoUrl: user.photoURL,
      uid: user.identifier,
      status: 'Ativo',
    };

    try {
      const token = Cookies.get('authToken');
      await fetch(`${import.meta.env.VITE_API_URL}/events/${eventId}/organizadores`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ organizadores: [novoOrganizador] }),
      });
      alert('Organizador adicionado com sucesso.');
      onRequestClose(); // Fecha o modal após a operação
    } catch (error) {
      console.error('Erro ao adicionar organizador:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="full-screen-modal"
      overlayClassName="modal-overlay"
    >
      <div className="modal-content">
        <button className="close-button orange" onClick={onRequestClose}>X</button>
        <h2>Gerenciar Responsáveis</h2>
        
        <h3>Responsáveis Ativos</h3>
        <ul>
          {organizadores.filter(o => o.status === 'Ativo').map((organizador, index, array) => (
            <li key={organizador._id}>
              <div>
                <strong>Nome:</strong> {organizador.nome} <br />
                <strong>Email:</strong> {organizador.email}
              </div>
              {array.length > 1 && (
                <button onClick={() => handleInativarOrganizador(organizador._id)}>
                  Apagar Organizador
                </button>
              )}
            </li>
          ))}
        </ul>

        <h3>Adicionar Novo Responsável</h3>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            const query = e.target.value.trim();
            setSearchTerm(query);
            fetchUsers(query);
          }}
          placeholder="Digite o identificador do usuário"
        />
        {loading && <p>Carregando...</p>}
        <ul>
          {users.map(user => (
            <li key={user._id}>
              <div>
                <strong>Nome:</strong> {user.displayName} <br />
                <strong>Email:</strong> {user.email} <br />
              </div>
              <button
                disabled={!user.emailVerified}
                onClick={() => handleAdicionarOrganizador(user)}
              >
                Tornar este usuário administrador
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
};

export default GerenciarResponsaveisModal;