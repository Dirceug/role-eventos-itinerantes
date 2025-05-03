const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Navbar-DOr28yyx.js","assets/index-CXP7wpmU.js","assets/index-BIH4TKpF.css","assets/index-e84cf44d-BcL1Y4JN.js","assets/Navbar-DjX9SrpG.css","assets/BackButton-4REAfoK1.js","assets/BackButton-jJCXNcnd.css"])))=>i.map(i=>d[i]);
import { e as useLocation, u as useNavigate, r as reactExports, U as UserContext, j as jsxRuntimeExports, b as api, _ as __vitePreload } from "./index-CXP7wpmU.js";
const Navbar = reactExports.lazy(() => __vitePreload(() => import("./Navbar-DOr28yyx.js"), true ? __vite__mapDeps([0,1,2,3,4]) : void 0));
const BackButton = reactExports.lazy(() => __vitePreload(() => import("./BackButton-4REAfoK1.js"), true ? __vite__mapDeps([5,1,2,6]) : void 0));
const ListaBarracas = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { eventId } = location.state || {};
  const { user } = reactExports.useContext(UserContext);
  const [event, setEvent] = reactExports.useState(null);
  const [barracas, setBarracas] = reactExports.useState([]);
  reactExports.useEffect(() => {
    const fetchEvent = async () => {
      const token = api.get("authToken");
      if (!token) {
        console.error("No token found");
        return;
      }
      try {
        const response = await fetch(`${"http://52.14.179.20"}/events/${eventId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.barracas) {
          const activeBarracas = data.barracas;
          setBarracas(activeBarracas);
        } else {
          console.error("No barracas found in event data");
        }
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };
    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);
  if (!event) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Loading..." });
  }
  const handleCardapioClick = (barracaId) => {
    navigate(`/event/${eventId}/barraca/${barracaId}/cardapio`);
  };
  const userToken = api.get("authToken");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Carregando..." }), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, { user, token: userToken }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lista-barracas-container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BackButton, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: event.nome }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "barracas-list", children: barracas.map((barraca) => {
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "barraca-card", onClick: () => handleCardapioClick(barraca._id), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: barraca.nome }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: barraca.descricao }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "cardapio-list", children: barraca.cardapio.filter((prato) => prato.status === "ativo").map((prato) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: prato.nome }, prato._id)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "status", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Status:" }),
            " ",
            barraca.status
          ] })
        ] }, barraca._id);
      }) })
    ] }) })
  ] });
};
export {
  ListaBarracas as default
};
