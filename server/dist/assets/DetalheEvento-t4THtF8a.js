const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Navbar-B2cfVznA.js","assets/index-BYsE5TuP.js","assets/index-BIH4TKpF.css","assets/index-9ae71ce3-D9oYUShw.js","assets/Navbar-DjX9SrpG.css","assets/CurtidasButton-DWtQapK8.js","assets/CurtidasButton-DZ0ahqe3.css","assets/BackButton-BRfddWVl.js","assets/BackButton-jJCXNcnd.css"])))=>i.map(i=>d[i]);
import { d as useParams, u as useNavigate, r as reactExports, U as UserContext, j as jsxRuntimeExports, b as api, c as React, _ as __vitePreload } from "./index-BYsE5TuP.js";
const Navbar = reactExports.lazy(() => __vitePreload(() => import("./Navbar-B2cfVznA.js"), true ? __vite__mapDeps([0,1,2,3,4]) : void 0));
const CurtidasButton = reactExports.lazy(() => __vitePreload(() => import("./CurtidasButton-DWtQapK8.js"), true ? __vite__mapDeps([5,1,2,6]) : void 0));
const BackButton = reactExports.lazy(() => __vitePreload(() => import("./BackButton-BRfddWVl.js"), true ? __vite__mapDeps([7,1,2,8]) : void 0));
const DetalheEvento = (props) => {
  const { eventId } = useParams();
  useNavigate();
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
    fetchEvent();
  }, [eventId]);
  if (!event) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Loading..." });
  }
  const handleShareClick = (socialMedia) => {
    alert(`Compartilhado com ${socialMedia}`);
  };
  const userToken = api.get("authToken");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Carregando..." }), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, { user, token: userToken, eventId }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "detalhe-evento-container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "detalhe-evento-header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CurtidasButton, { eventId, initialLikesCount: event.numeroFavoritos }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(BackButton, {})
      ] }),
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
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "detalhe-evento-footer", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "social-buttons", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleShareClick("Instagram"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/img/icones/instagram.png", alt: "Instagram" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleShareClick("Facebook"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/img/icones/facebook.png", alt: "Facebook" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleShareClick("WhatsApp"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/img/icones/whatsapp.png", alt: "WhatsApp" }) })
      ] }) })
    ] }) })
  ] });
};
export {
  DetalheEvento as default
};
