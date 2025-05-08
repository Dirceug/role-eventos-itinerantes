import { j as jsxRuntimeExports, L as Link, R as Routes, a as Route } from "./index-Cc20aRZ1.js";
function ProducaoAcompanhamento() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Produção e Acompanhamento" }) });
}
function ControleVendasFluxoFinanceiro() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Controle de Vendas e Fluxo Financeiro" }) });
}
function Servico() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "producao-acompanhamento", children: "Produção e Acompanhamento" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "controle-vendas-fluxo-financeiro", children: "Controle de Vendas e Fluxo Financeiro" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Routes, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "producao-acompanhamento", element: /* @__PURE__ */ jsxRuntimeExports.jsx(ProducaoAcompanhamento, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "controle-vendas-fluxo-financeiro", element: /* @__PURE__ */ jsxRuntimeExports.jsx(ControleVendasFluxoFinanceiro, {}) })
    ] })
  ] });
}
export {
  Servico as default
};
