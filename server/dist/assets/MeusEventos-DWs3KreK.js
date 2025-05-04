const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/CurtidasButton-Dq2V5NR2.js","assets/index-Dwuq2f-n.js","assets/index-BIH4TKpF.css","assets/CurtidasButton-DZ0ahqe3.css","assets/GerenciarResponsaveisModal-YBMGmJ8X.js","assets/index-PQYg75GN.js","assets/GerenciarResponsaveisModal-BZzyLXvc.css","assets/Navbar-DVGcGRU4.js","assets/index-9ae71ce3-BWNZJcxD.js","assets/Navbar-DjX9SrpG.css","assets/EditarButton-BHqOzSdX.js","assets/CardapioButton-BM6JREyZ.css"])))=>i.map(i=>d[i]);
import { r as reactExports, c as React, U as UserContext, j as jsxRuntimeExports, b as api, _ as __vitePreload } from "./index-Dwuq2f-n.js";
import { e as eventoBase } from "./eventoBase-jXVQ2lm8.js";
import { M as Modal } from "./index-PQYg75GN.js";
reactExports.lazy(() => __vitePreload(() => import("./CurtidasButton-Dq2V5NR2.js"), true ? __vite__mapDeps([0,1,2,3]) : void 0));
const GerenciarResponsaveisModal = reactExports.lazy(() => __vitePreload(() => import("./GerenciarResponsaveisModal-YBMGmJ8X.js"), true ? __vite__mapDeps([4,1,2,5,6]) : void 0));
Modal.setAppElement("#root");
const EditarEventoModal = ({ isOpen, onRequestClose, eventId }) => {
  const [event, setEvent] = reactExports.useState(null);
  const { user } = React.useContext(UserContext);
  const [isGerenciarModalOpen, setIsGerenciarModalOpen] = reactExports.useState(false);
  const modalRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const fetchEvent = async () => {
      const token = api.get("authToken");
      if (!token) {
        console.error("No token found");
        return;
      }
      try {
        const response = await fetch(`${"http://localhost:5000/api"}/events/${eventId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };
    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);
  reactExports.useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);
  if (!event) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Loading..." });
  }
  const handleGerenciarResponsaveis = () => {
    onRequestClose();
    setTimeout(() => {
      setIsGerenciarModalOpen(true);
    }, 300);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        isOpen,
        onRequestClose,
        className: "full-screen-modal",
        overlayClassName: "modal-overlay",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "modal-content",
            ref: modalRef,
            tabIndex: -1,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-button orange", onClick: onRequestClose, children: "X" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "detalhe-evento-container", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "detalhe-evento-foto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: event.fotoUrl, alt: event.nome }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "detalhe-evento-info", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: event.nome }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "organizador", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Organizado por: " }),
                    event.organizadores && event.organizadores.map((organizador, index, array) => /* @__PURE__ */ jsxRuntimeExports.jsxs(React.Fragment, { children: [
                      organizador.nome,
                      index < array.length - 1 ? ", " : ""
                    ] }, organizador._id))
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: event.descricao })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "detalhe-evento-footer", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "edit-buttons", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => alert("Abrir modal para editar detalhes do evento"), children: "Detalhes do evento" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleGerenciarResponsaveis, children: "Adicionar responsável pelo evento" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => alert("Abrir modal para adicionar barraca"), children: "Adicionar barraca" })
                ] }) })
              ] }) })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Carregando..." }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      GerenciarResponsaveisModal,
      {
        isOpen: isGerenciarModalOpen,
        onRequestClose: () => setIsGerenciarModalOpen(false),
        eventId,
        organizadores: event.organizadores
      }
    ) })
  ] });
};
const Navbar = reactExports.lazy(() => __vitePreload(() => import("./Navbar-DVGcGRU4.js"), true ? __vite__mapDeps([7,1,2,8,9]) : void 0));
const CurtidasButton = reactExports.lazy(() => __vitePreload(() => import("./CurtidasButton-Dq2V5NR2.js"), true ? __vite__mapDeps([0,1,2,3]) : void 0));
const EditarButton = reactExports.lazy(() => __vitePreload(() => import("./EditarButton-BHqOzSdX.js"), true ? __vite__mapDeps([10,1,2,11]) : void 0));
const MeusEventos = () => {
  const [events, setEvents] = reactExports.useState([]);
  const [isModalOpen, setIsModalOpen] = reactExports.useState(false);
  const [selectedEventId, setSelectedEventId] = reactExports.useState(null);
  const { user } = reactExports.useContext(UserContext);
  reactExports.useEffect(() => {
    const fetchEvents = async () => {
      const token = api.get("authToken");
      if (!token) {
        console.error("No token found");
        return;
      }
      if (!user || !user._id) {
        console.error("User not loaded or missing ID");
        return;
      }
      try {
        const response = await fetch(`${"http://localhost:5000/api"}/events`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });
        const data = await response.json();
        const userEvents = Array.isArray(data) ? data.filter(
          (event) => event.organizadores.some(
            (organizador) => organizador.uid === user._id
          )
        ) : [];
        setEvents(userEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, [user]);
  const handleOpenModal = (eventId) => {
    setSelectedEventId(eventId);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setSelectedEventId(null);
    setIsModalOpen(false);
  };
  const handleCriarEventoClick = () => {
    window.location.href = "/eventos/novo";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Carregando..." }), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, { user, token: api.get("authToken") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "upcoming-events-container", children: events.length > 0 ? events.map((event) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "event",
        style: { backgroundImage: `url(${event.fotoUrl || eventoBase})` },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "event-overlay", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "event-content", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "event-title", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: event.nome }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "event-description", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "event-descricao", children: event.descricao.length > 244 ? `${event.descricao.substring(0, 241)}...` : event.descricao }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                event.endereco.cidade,
                " - ",
                event.endereco.estado
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "event-details", children: event.dataEvento && event.dataEvento.map((data, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "event-date", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "date", children: new Date(data.dataAbertura).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit"
              }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "time", children: data.horaAbertura }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "time", children: data.horaFechamento })
            ] }, index)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "event-likes", onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(CurtidasButton, { eventId: event._id, initialLikesCount: event.numeroFavoritos }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "event-barracas", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            EditarButton,
            {
              label: "Editar evento",
              size: "40px",
              onClick: () => handleOpenModal(event._id)
            }
          ) })
        ] })
      },
      event._id
    )) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "no-events-container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "no-events-text", children: "Você não tem nenhum evento cadastrado" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "create-event-button", onClick: handleCriarEventoClick, children: "Cadastre um evento" })
    ] }) }),
    isModalOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
      EditarEventoModal,
      {
        isOpen: isModalOpen,
        onRequestClose: handleCloseModal,
        eventId: selectedEventId
      }
    )
  ] });
};
export {
  MeusEventos as default
};
