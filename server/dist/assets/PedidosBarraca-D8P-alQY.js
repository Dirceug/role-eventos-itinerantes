import { r as reactExports, u as useNavigate, j as jsxRuntimeExports, b as api } from "./index-Cc20aRZ1.js";
const PedidosBarracas = () => {
  const [pedidos, setPedidos] = reactExports.useState([]);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    const fetchPedidos = async () => {
      const token = api.get("authToken");
      if (!token) {
        console.error("No token found");
        setError("Você não está autenticado. Por favor, faça login novamente.");
        setIsLoading(false);
        return;
      }
      try {
        const response = await fetch(`${"https://rolesemfila.com.br/api"}/pedidos`, {
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
        setPedidos(data);
      } catch (error2) {
        console.error("Erro ao buscar pedidos:", error2);
        setError("Ocorreu um erro ao buscar os pedidos. Tente novamente mais tarde.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPedidos();
  }, []);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Carregando..." });
  }
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "error-message", children: error });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "back-button", onClick: () => navigate(-1), children: "Back" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lista-pedidos-container", children: pedidos.map((pedido) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pedido-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: pedido.nomePrato }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Número do Pedido:" }),
        " ",
        pedido.numeroPedido
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Quantidade:" }),
        " ",
        pedido.quantidade
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Status:" }),
        " ",
        pedido.status
      ] })
    ] }, pedido._id)) })
  ] });
};
export {
  PedidosBarracas as default
};
