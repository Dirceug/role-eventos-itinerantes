import { r as reactExports, U as UserContext, j as jsxRuntimeExports, b as api, y } from "./index-CWX6cuis.js";
import { M as Modal } from "./index-DC4gqTGo.js";
import { a as axios } from "./index-ZD4TjlMZ.js";
import { S as ScaleLoader } from "./ScaleLoader-5kf0ulWU.js";
const CompraLoader = () => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "loader-container", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScaleLoader, { color: "#EE7F43", height: 100, radius: 15, speedMultiplier: 1, width: 1 }) });
Modal.setAppElement("#root");
const Comprar = ({ isOpen, onRequestClose, user, prato, eventId, barracaId, barracaNome, chaveBarraca }) => {
  const { loadingUser } = reactExports.useContext(UserContext);
  const [quantidade, setQuantidade] = reactExports.useState(1);
  const [observacoes, setObservacoes] = reactExports.useState("");
  const [dataHoraRetirada, setDataHoraRetirada] = reactExports.useState("");
  const [showObservacoes, setShowObservacoes] = reactExports.useState(false);
  const [showDataHoraRetirada, setShowDataHoraRetirada] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const handleMais = () => {
    if (quantidade < prato.estoque && quantidade < 10) {
      setQuantidade(quantidade + 1);
    }
  };
  const handleMenos = () => {
    if (quantidade > 1) {
      setQuantidade(quantidade - 1);
    }
  };
  const handlePedido = async (e) => {
    e.preventDefault();
    setLoading(true);
    const transactionData = {
      usuarioId: user._id,
      eventoId: eventId,
      barracaId,
      cardapioId: prato._id,
      tipo: "compra",
      valor: prato.valor * quantidade,
      moeda: "BRL",
      quantidade,
      valorUnidade: prato.valor,
      descricao: prato.ingredientes,
      detalhes: observacoes || null,
      dataHoraRetirada: dataHoraRetirada || null,
      // Incluindo novo campo
      tempoPreparo: prato.tempoPreparo,
      status: "pendente",
      chaveBarraca,
      foto: prato.imagem
    };
    try {
      const apiUrl = "http://52.14.179.20";
      if (!apiUrl) ;
      const response = await axios.post(`${apiUrl}/transactions`, transactionData, {
        headers: {
          "Authorization": `Bearer ${api.get("authToken")}`,
          "Content-Type": "application/json"
        }
      });
      y.success(response.data.message);
      setLoading(false);
      onRequestClose();
    } catch (error2) {
      console.error("Erro ao enviar pedido:", error2);
      y.error("Erro ao enviar pedido. Tente novamente.");
      setLoading(false);
    }
  };
  if (loadingUser) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(CompraLoader, {});
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      isOpen,
      onRequestClose,
      shouldCloseOnOverlayClick: true,
      className: "comprar-modal",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal-content", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-button", onClick: onRequestClose, children: "X" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: prato.imagem, alt: prato.nome, className: "prato-imagem2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "prato-info", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "prato-nome", children: prato.nome }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "prato-ingredientes", children: prato.ingredientes }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "prato-valor", children: [
            "R$ ",
            prato.valor.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "checkbox-container", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: showObservacoes,
              onChange: () => setShowObservacoes(!showObservacoes)
            }
          ),
          "Incluir Alterações"
        ] }) }),
        showObservacoes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "observacoes", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "observacoes", children: "Alterações" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              id: "observacoes",
              value: observacoes,
              onChange: (e) => setObservacoes(e.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "checkbox-container", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: showDataHoraRetirada,
              onChange: () => setShowDataHoraRetirada(!showDataHoraRetirada)
            }
          ),
          "Agendar Retirada"
        ] }) }),
        showDataHoraRetirada && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "data-hora-retirada", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "dataHoraRetirada", children: "Data e Hora de Retirada" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "datetime-local",
              id: "dataHoraRetirada",
              value: dataHoraRetirada,
              onChange: (e) => setDataHoraRetirada(e.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("hr", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "quantidade-container", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "quantidade-label", children: "Unidades" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "quantidade-button", onClick: handleMenos, disabled: quantidade <= 1, children: "-" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "quantidade", children: quantidade }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "quantidade-button", onClick: handleMais, disabled: quantidade >= prato.estoque || quantidade >= 10, children: "+" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("hr", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "total-container", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "total", children: [
          "Total: R$ ",
          (prato.valor * quantidade).toFixed(2)
        ] }) }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "error-message", children: error }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "pedido-button", onClick: handlePedido, disabled: loading, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScaleLoader, { color: "#EE7F43", height: 20, radius: 10, speedMultiplier: 1, width: 2 }) : "Realizar Pedido" })
      ] })
    }
  );
};
export {
  Comprar as default
};
