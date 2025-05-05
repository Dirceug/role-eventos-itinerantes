const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Navbar-B2cfVznA.js","assets/index-BYsE5TuP.js","assets/index-BIH4TKpF.css","assets/index-9ae71ce3-D9oYUShw.js","assets/Navbar-DjX9SrpG.css","assets/CurtidasButton-DWtQapK8.js","assets/CurtidasButton-DZ0ahqe3.css","assets/CardapioButton-B7kL9_j1.js","assets/CardapioButton-BM6JREyZ.css"])))=>i.map(i=>d[i]);
import { r as reactExports, U as UserContext, u as useNavigate, b as api, j as jsxRuntimeExports, _ as __vitePreload } from "./index-BYsE5TuP.js";
import { e as eventoBase } from "./eventoBase-jXVQ2lm8.js";
const Navbar = reactExports.lazy(() => __vitePreload(() => import("./Navbar-B2cfVznA.js"), true ? __vite__mapDeps([0,1,2,3,4]) : void 0));
const CurtidasButton = reactExports.lazy(() => __vitePreload(() => import("./CurtidasButton-DWtQapK8.js"), true ? __vite__mapDeps([5,1,2,6]) : void 0));
const CardapioButton = reactExports.lazy(() => __vitePreload(() => import("./CardapioButton-B7kL9_j1.js"), true ? __vite__mapDeps([7,1,2,8]) : void 0));
const ListaEventos = () => {
  const [events, setEvents] = reactExports.useState([]);
  const { user } = reactExports.useContext(UserContext);
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    const fetchEvents = async () => {
      const token = api.get("authToken");
      if (!token) {
        console.error("No token found");
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
        setEvents(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);
  const handleEventClick = (eventId) => {
    navigate(`/event/${eventId}/details`);
  };
  const handleCardapioClick = (eventId, e) => {
    e.stopPropagation();
    navigate("/lista-barracas", { state: { eventId, userId: user ? user.uid : null } });
  };
  const userToken = api.get("authToken");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Carregando..." }), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, { user, token: userToken }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "upcoming-events-container", children: events.map((event) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "event",
        style: { backgroundImage: `url(${event.fotoUrl || eventoBase})` },
        onClick: () => handleEventClick(event._id),
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
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "date", children: new Date(data.dataAbertura).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "time", children: data.horaAbertura }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "time", children: data.horaFechamento })
            ] }, index)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "event-likes", onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(CurtidasButton, { eventId: event._id, initialLikesCount: event.numeroFavoritos }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "event-barracas", onClick: (e) => handleCardapioClick(event._id, e), children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardapioButton, { label: "Ver Barracas", size: "40px" }) })
        ] })
      },
      event._id
    )) })
  ] });
};
export {
  ListaEventos as default
};
