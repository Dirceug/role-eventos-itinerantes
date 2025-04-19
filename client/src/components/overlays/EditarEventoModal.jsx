import React, { useEffect, useState, lazy, Suspense } from 'react';
import Modal from 'react-modal';
import './EditarEventoModal.css'; 
import Cookies from 'js-cookie';
import UserContext from '../../contexts/UserContext';

// const Navbar = lazy(() => import('../components/layout/Navbar'));
const CurtidasButton = lazy(() => import('../buttons/CurtidasButton'));

Modal.setAppElement('#root');

const EditarEventoModal = ({ isOpen, onRequestClose, eventId }) => {
  const [event, setEvent] = useState(null);
  const { user } = React.useContext(UserContext);

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

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="full-screen-modal"
      overlayClassName="modal-overlay"
    >
      <div className="modal-content">
        <button className="close-button orange" onClick={onRequestClose}>X</button>
        {/* <Navbar user={user} token={Cookies.get('authToken')} eventId={eventId} /> */}
        <div className="container">
          <div className="detalhe-evento-container">
            <div className="detalhe-evento-header">
              <CurtidasButton eventId={eventId} initialLikesCount={event.numeroFavoritos} />
            </div>
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
                <button onClick={() => alert("Abrir modal para adicionar responsável pelo evento")}>
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
  );
};

export default EditarEventoModal;