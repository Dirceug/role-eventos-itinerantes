import { u as useNavigate, j as jsxRuntimeExports } from "./index-Dwuq2f-n.js";
/* empty css                            */
import { c as cardapioIcon } from "./cardapioBranco-Cdq6HB4V.js";
function ListaPedidosButton({ eventId, userId, label }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/lista-pedidos");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "lista-pedidos-button", onClick: handleClick, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lista-pedidos-content", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: cardapioIcon, alt: "Lista de Pedidos", className: "lista-pedidos-icon" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "lista-pedidos-label", children: label })
  ] }) });
}
export {
  ListaPedidosButton as default
};
