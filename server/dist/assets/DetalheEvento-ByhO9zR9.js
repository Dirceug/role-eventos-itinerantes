const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Navbar-CMs1aoFJ.js","assets/index-Cc20aRZ1.js","assets/index-BIH4TKpF.css","assets/index-9ae71ce3-BWNZJcxD.js","assets/Navbar-C-lSoUeI.css","assets/CurtidasButton-BKg0fkiF.js","assets/CurtidasButton-DZ0ahqe3.css"])))=>i.map(i=>d[i]);
import { d as useParams, u as useNavigate, r as reactExports, U as UserContext, j as jsxRuntimeExports, b as api, c as React, _ as __vitePreload } from "./index-Cc20aRZ1.js";
const state = "/assets/state-tFVx_kML.jpeg";
const Navbar = reactExports.lazy(() => __vitePreload(() => import("./Navbar-CMs1aoFJ.js"), true ? __vite__mapDeps([0,1,2,3,4]) : void 0));
const CurtidasButton = reactExports.lazy(() => __vitePreload(() => import("./CurtidasButton-BKg0fkiF.js"), true ? __vite__mapDeps([5,1,2,6]) : void 0));
const DetalheEvento = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = reactExports.useState(null);
  const { user } = reactExports.useContext(UserContext);
  reactExports.useEffect(() => {
    const fetchEvent = async () => {
      const token = api.get("authToken");
      if (!token) {
        console.error("No token found");
        return;
      }
      try {
        const response = await fetch(`${"https://rolesemfila.com.br/api"}/events/${eventId}`, {
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
    fetchEvent();
  }, [eventId]);
  if (!event) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Loading..." });
  }
  const handleBackClick = () => {
    navigate(-1);
  };
  const userToken = api.get("authToken");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Carregando..." }), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, { user, token: userToken, eventId }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "back-button-container", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "back-button", onClick: handleBackClick, children: "← Voltar" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "detalhe-evento-container", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "detalhe-evento-header", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CurtidasButton, { eventId, initialLikesCount: event.numeroFavoritos }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "detalhe-evento-foto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: state, alt: event.nome }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "detalhe-evento-info", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: event.nome }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "organizador", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Organizado por: " }),
            event.organizadores && event.organizadores.map((organizador, index, array) => /* @__PURE__ */ jsxRuntimeExports.jsxs(React.Fragment, { children: [
              organizador.nome,
              index < array.length - 1 ? ", " : ""
            ] }, organizador._id))
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            new Date(event.data).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
            " - ",
            new Date(event.data).toLocaleDateString("pt-BR", { weekday: "long" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: event.descricao }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "data-detalhada-container", children: event.dataEvento && event.dataEvento.map((data, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "data-detalhada", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              new Date(data.dataAbertura).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
              " - ",
              new Date(data.dataAbertura).toLocaleDateString("pt-BR", { weekday: "long" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              "Abertura: ",
              data.horaAbertura
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              "Fechamento: ",
              data.horaFechamento
            ] })
          ] }, index)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "detalhe-evento-footer" })
      ] })
    ] })
  ] });
};
export {
  DetalheEvento as default
};
