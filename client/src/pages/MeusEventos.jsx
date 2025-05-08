import React, { useState, useEffect, useContext, lazy, Suspense } from 'react';
import './ListaEventos.css'; // Reutilizando o mesmo CSS do ListaEventos
import eventoBase from '../img/eventoBase.jpeg';
import Cookies from 'js-cookie';
import UserContext from '../contexts/UserContext';
import EditarEventoModal from '../components/overlays/EditarEventoModal';

const Navbar = lazy(() => import('../components/layout/Navbar'));
const CurtidasButton = lazy(() => import('../components/buttons/CurtidasButton'));
const EditarButton = lazy(() => import('../components/buttons/EditarButton'));
const BarracasButton = lazy(() => import('../components/buttons/CardapioButton')); // Adicionado botão "Minhas Barracas"

const MeusEventos = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const { user } = useContext(UserContext);

  // Função para buscar eventos organizados pelo usuário logado
  useEffect(() => {
    const fetchEvents = async () => {
      const token = Cookies.get('authToken');
      if (!token) {
        console.error('No token found');
        return;
      }

      if (!user || !user._id) {
        console.error('User not loaded or missing ID');
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/events`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();

        // Filtrar eventos onde o usuário logado é organizador
        const userEvents = Array.isArray(data)
          ? data.filter((event) =>
              event.organizadores.some(
                (organizador) => organizador.uid === user._id
              )
            )
          : [];
        setEvents(userEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [user]);

  // Abrir o modal de edição
  const handleOpenModal = (eventId) => {
    setSelectedEventId(eventId);
    setIsModalOpen(true);
  };

  // Fechar o modal de edição
  const handleCloseModal = () => {
    setSelectedEventId(null);
    setIsModalOpen(false);
  };

  // Redirecionar para criar um novo evento
  const handleCriarEventoClick = () => {
    window.location.href = '/eventos/novo';
  };

  // Redirecionar para a página "Minhas Barracas"
  const handleMinhasBarracasClick = (eventId) => {
    // Certifique-se de que o eventId é válido antes de redirecionar
    if (eventId) {
      window.location.href = `/event/${eventId}/barracas`;
    } else {
      console.error('eventId is undefined');
    }
  };

  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Navbar user={user} token={Cookies.get('authToken')} />
      <div className="upcoming-events-container">
        {events.length > 0 ? (
          events.map((event) => (
            <div
              key={event._id}
              className="event"
              style={{ backgroundImage: `url(${event.fotoUrl || eventoBase})` }}
            >
              <div className="event-overlay">
                <div className="event-content">
                  <div className="event-title">
                    <h2>{event.nome}</h2>
                  </div>
                  <div className="event-description">
                    <p className="event-descricao">
                      {event.descricao.length > 244
                        ? `${event.descricao.substring(0, 241)}...`
                        : event.descricao}
                    </p>
                    <p><br /></p>
                    <p>{event.endereco.cidade} - {event.endereco.estado}</p>
                  </div>
                  <div className="event-details">
                    {event.dataEvento &&
                      event.dataEvento.map((data, index) => (
                        <div key={index} className="event-date">
                          <p className="date">
                            {new Date(data.dataAbertura).toLocaleDateString('pt-BR', {
                              day: '2-digit',
                              month: '2-digit',
                            })}
                          </p>
                          <p className="time">{data.horaAbertura}</p>
                          <p className="time">{data.horaFechamento}</p>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="event-likes" onClick={(e) => e.stopPropagation()}>
                  <CurtidasButton eventId={event._id} initialLikesCount={event.numeroFavoritos} />
                </div>
                <div className="event-barracas2">
                  <EditarButton
                    label="Editar evento"
                    size="40px"
                    onClick={() => handleOpenModal(event._id)}
                  />
                  <BarracasButton
                    label="Minhas Barracas"
                    size="40px"
                    onClick={() => handleMinhasBarracasClick(event._id)}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-events-container">
            <h1 className="no-events-text">Você não tem nenhum evento cadastrado</h1>
            <button className="create-event-button" onClick={handleCriarEventoClick}>
              Cadastre um evento
            </button>
          </div>
        )}
      </div>

      {/* Modal para editar evento */}
      {isModalOpen && (
        <EditarEventoModal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          eventId={selectedEventId}
        />
      )}
    </Suspense>
  );
};

export default MeusEventos;