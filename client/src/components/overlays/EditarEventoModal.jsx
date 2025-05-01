import React, { useEffect, useState, lazy, Suspense, useRef } from 'react';
import Modal from 'react-modal';
import './EditarEventoModal.css'; 
import Cookies from 'js-cookie';
import UserContext from '../../contexts/UserContext';

// Lazy load de componentes
const CurtidasButton = lazy(() => import('../buttons/CurtidasButton'));
const GerenciarResponsaveisModal = lazy(() => import('./GerenciarResponsaveisModal'));

Modal.setAppElement('#root');

const EditarEventoModal = ({ isOpen, onRequestClose, eventId }) => {
  const [event, setEvent] = useState(null);
  const { user } = React.useContext(UserContext);
  const [isGerenciarModalOpen, setIsGerenciarModalOpen] = useState(false);
  const modalRef = useRef(null); // Referência para o modal principal

  useEffect(() => {
    const fetchEvent = async () => {
      const token = Cookies.get('authToken');
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/events/${eventId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus(); // Move o foco para o modal principal ao abri-lo
    }
  }, [isOpen]);

  if (!event) {
    return <div>Loading...</div>;
  }

  const handleGerenciarResponsaveis = () => {
    onRequestClose(); // Fecha o modal principal
    setTimeout(() => {
      setIsGerenciarModalOpen(true); // Abre o novo modal após o fechamento do principal
    }, 300); // Pequeno atraso para evitar conflitos de renderização
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        className="full-screen-modal"
        overlayClassName="modal-overlay"
      >
        <div
          className="modal-content"
          ref={modalRef} // Define a referência para o modal principal
          tabIndex={-1} // Torna o modal focável
        >
          <button className="close-button orange" onClick={onRequestClose}>X</button>
          <div className="container">
            <div className="detalhe-evento-container">
              <div className="detalhe-evento-foto">
                <img src={event.fotoUrl} alt={event.nome} />
              </div>
              <div className="detalhe-evento-info">
                <h2>{event.nome}</h2>
                <div className="organizador">
                  <p><strong>Organizado por: </strong>
                    {event.organizadores &&
                      event.organizadores.map((organizador, index, array) => (
                        <React.Fragment key={organizador._id}>
                          {organizador.nome}
                          {index < array.length - 1 ? ', ' : ''}
                        </React.Fragment>
                      ))}
                  </p>
                </div>
                <p>{event.descricao}</p>
              </div>
              <div className="detalhe-evento-footer">
                <div className="edit-buttons">
                  <button onClick={() => alert("Abrir modal para editar detalhes do evento")}>
                    Detalhes do evento
                  </button>
                  <button onClick={handleGerenciarResponsaveis}>
                    Adicionar responsável pelo evento
                  </button>
                  <button onClick={() => alert("Abrir modal para adicionar barraca")}>
                    Adicionar barraca
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Suspense fallback={<div>Carregando...</div>}>
        <GerenciarResponsaveisModal
          isOpen={isGerenciarModalOpen}
          onRequestClose={() => setIsGerenciarModalOpen(false)}
          eventId={eventId}
          organizadores={event.organizadores}
        />
      </Suspense>
    </>
  );
};

export default EditarEventoModal;