const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Navbar-CMs1aoFJ.js","assets/index-Cc20aRZ1.js","assets/index-BIH4TKpF.css","assets/index-9ae71ce3-BWNZJcxD.js","assets/Navbar-C-lSoUeI.css"])))=>i.map(i=>d[i]);
import { r as reactExports, U as UserContext, f as useSearchParams, u as useNavigate, j as jsxRuntimeExports, b as api, _ as __vitePreload } from "./index-Cc20aRZ1.js";
const Navbar = reactExports.lazy(() => __vitePreload(() => import("./Navbar-CMs1aoFJ.js"), true ? __vite__mapDeps([0,1,2,3,4]) : void 0));
const MinhasBarracas = () => {
  const { user } = reactExports.useContext(UserContext);
  const [pedidos, setPedidos] = reactExports.useState([]);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const [searchParams] = useSearchParams();
  const barracaId = searchParams.get("barracaId");
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (!barracaId) {
      console.error("Nenhum barracaId foi fornecido na URL");
      setError("Nenhuma barraca associada foi encontrada.");
      setIsLoading(false);
      return;
    }
    const fetchPedidos = async () => {
      const token = api.get("authToken");
      if (!token) {
        console.error("Nenhum token de autenticação encontrado");
        setError("Você não está autenticado. Por favor, faça login novamente.");
        setIsLoading(false);
        return;
      }
      try {
        const response = await fetch(`${"https://rolesemfila.com.br/api"}/pedidos?barracaId=${barracaId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error(`Erro HTTP! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.length === 0) {
          setError("Nenhum pedido encontrado para esta barraca.");
        } else {
          setPedidos(data);
        }
      } catch (error2) {
        console.error("Erro ao buscar pedidos:", error2);
        setError("Ocorreu um erro ao buscar os pedidos. Tente novamente mais tarde.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPedidos();
  }, [barracaId]);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Carregando..." });
  }
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "error-message", children: error });
  }
  const handleViewPedidos = () => {
    console.log();
    navigate(`/pedidos-barracas`);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Carregando..." }), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, { user }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lista-pedidos-container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "view-pedidos-button", onClick: handleViewPedidos, children: "Ver Todos os Pedidos" }),
      pedidos.map((pedido) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pedido-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pedido-info", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: pedido.descricao }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Quantidade:" }),
          " ",
          pedido.quantidade
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Valor Total:" }),
          " R$",
          pedido.valor * pedido.quantidade
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Status:" }),
          " ",
          pedido.status
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Última Atualização:" }),
          " ",
          new Date(pedido.ultimaAtualizacao).toLocaleString("pt-BR")
        ] })
      ] }) }, pedido._id))
    ] })
  ] });
};
export {
  MinhasBarracas as default
};
