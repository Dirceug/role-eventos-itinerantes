const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Navbar-DXsSPmEa.js","assets/index-Cj7anpas.js","assets/index-BIH4TKpF.css","assets/index-e84cf44d-BcL1Y4JN.js","assets/Navbar-DjX9SrpG.css","assets/BackButton-B_q2GXon.js","assets/BackButton-jJCXNcnd.css","assets/Comprar-Co2xEXIF.js","assets/index-COwp6RUQ.js","assets/index-ZD4TjlMZ.js","assets/ScaleLoader-DMD-dLcB.js","assets/Comprar-DO5kTjHH.css"])))=>i.map(i=>d[i]);
import { d as useParams, r as reactExports, U as UserContext, j as jsxRuntimeExports, b as api, _ as __vitePreload } from "./index-Cj7anpas.js";
import { M as Modal } from "./index-COwp6RUQ.js";
const Navbar = reactExports.lazy(() => __vitePreload(() => import("./Navbar-DXsSPmEa.js"), true ? __vite__mapDeps([0,1,2,3,4]) : void 0));
const BackButton = reactExports.lazy(() => __vitePreload(() => import("./BackButton-B_q2GXon.js"), true ? __vite__mapDeps([5,1,2,6]) : void 0));
const Comprar = reactExports.lazy(() => __vitePreload(() => import("./Comprar-Co2xEXIF.js"), true ? __vite__mapDeps([7,1,2,8,9,10,11]) : void 0));
const DetalheCardapio = () => {
  const { eventId, barracaId } = useParams();
  const [barraca, setBarraca] = reactExports.useState(null);
  const [pratoSelecionado, setPratoSelecionado] = reactExports.useState(null);
  const { user } = reactExports.useContext(UserContext);
  reactExports.useEffect(() => {
    const fetchBarraca = async () => {
      const token = api.get("authToken");
      if (!token) {
        console.error("No token found");
        return;
      }
      try {
        const apiUrl = "http://52.14.179.20";
        if (!apiUrl) ;
        const response = await fetch(`${apiUrl}/events/${eventId}/barracas/${barracaId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });
        const data = await response.json();
        setBarraca(data);
      } catch (error) {
        console.error("Error fetching barraca:", error);
      }
    };
    fetchBarraca();
  }, [eventId, barracaId]);
  if (!barraca) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Loading..." });
  }
  const handleCompraClick = (prato) => {
    setPratoSelecionado(prato);
  };
  const closeModal = () => {
    setPratoSelecionado(null);
  };
  const userToken = api.get("authToken");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Carregando..." }), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, { user, token: userToken, eventId }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "detalhe-cardapio-container", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "detalhe-evento-cardapio", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BackButton, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: barraca.nome }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pratos-list", children: barraca.cardapio.filter((prato) => prato.status === "ativo").sort((a, b) => a.nome.localeCompare(b.nome)).map((prato) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "prato-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: prato.imagem, alt: prato.nome, className: "prato-imagem" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "prato-info", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "prato-nome", children: prato.nome }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "prato-ingredientes", children: prato.ingredientes }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "prato-bottom", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "prato-valor", children: [
                "R$ ",
                prato.valor
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleCompraClick(prato), children: "Comprar" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "prato-tempo", children: [
              " ",
              prato.tempoPreparo,
              " min"
            ] })
          ] })
        ] }, prato._id)) })
      ] }),
      pratoSelecionado && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Modal,
        {
          isOpen: !!pratoSelecionado,
          onRequestClose: closeModal,
          className: "comprar-modal",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Carregando..." }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Comprar,
            {
              user,
              prato: pratoSelecionado,
              eventId,
              barracaId,
              barracaNome: barraca.nome,
              chaveBarraca: barraca.chaveBarraca,
              isOpen: !!pratoSelecionado,
              onRequestClose: closeModal
            }
          ) })
        }
      )
    ] })
  ] });
};
export {
  DetalheCardapio as default
};
