import { j as jsxRuntimeExports } from "./index-CWX6cuis.js";
/* empty css                        */
const configIcon = "/assets/configuracao-CYx5x04Y.png";
const EditarButton = ({ label, onClick }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "cardapio-button", onClick: (e) => {
    e.stopPropagation();
    onClick();
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: configIcon, alt: "Editar", className: "cardapio-icon" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label })
  ] });
};
export {
  EditarButton as default
};
