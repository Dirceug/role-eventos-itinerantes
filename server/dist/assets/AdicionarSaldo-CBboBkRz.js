import { r as reactExports, U as UserContext, j as jsxRuntimeExports, y } from "./index-C8l_MEH7.js";
import { M as Modal } from "./index-CyAsttAV.js";
import { a as axios } from "./index-BSBq6A-N.js";
import { J as Joi } from "./joi-browser.min-DT_RmYUN.js";
import { S as ScaleLoader } from "./ScaleLoader-Da9h5rin.js";
const olhoFechado = "/assets/olhoFechadoLaranja-Bq5JxRJU.png";
const olhoAberto = "/assets/olhoAbertoLaranja-Ci-jIhHf.png";
const useSaldo = (userId, token) => {
  const [saldo, setSaldo] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const fetchSaldo = async () => {
      try {
        const apiUrl = "http://18.216.192.230/api";
        const response = await axios.get(`${apiUrl}/transactions/saldo/${userId}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        setSaldo(response.data.saldo);
      } catch (error) {
        console.error("Erro ao buscar saldo:", error);
      }
      setLoading(false);
    };
    if (userId) {
      fetchSaldo();
    }
  }, [userId, token]);
  return { saldo, loading };
};
const SaldoLoader = () => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "loader-container", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScaleLoader, { color: "#EE7F43", height: 100, radius: 15, speedMultiplier: 1, width: 1 }) });
Modal.setAppElement("#root");
const AdicionarSaldo = ({ isOpen, onRequestClose, userId, token }) => {
  const { loadingUser } = reactExports.useContext(UserContext);
  const { saldo, loading: loadingSaldo, setSaldo, setLoadingSaldo } = useSaldo(userId, token);
  const [valor, setValor] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [userDisplayName, setUserDisplayName] = reactExports.useState("");
  const [showSaldo, setShowSaldo] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (isOpen && userId) {
      const fetchSaldo = async () => {
        setLoadingSaldo(true);
        try {
          const apiUrl = "http://18.216.192.230/api";
          if (!apiUrl) ;
          const response = await axios.get(`${apiUrl}/transactions/saldo/${userId}`, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          });
          setSaldo(response.data.saldo);
        } catch (error2) {
          console.error("Erro ao buscar saldo:", error2);
        }
        setLoadingSaldo(false);
      };
      const fetchUser = async () => {
        try {
          const apiUrl = "http://18.216.192.230/api";
          if (!apiUrl) ;
          const response = await axios.get(`${apiUrl}/users/${userId}`, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          });
          setUserDisplayName(response.data.displayName);
        } catch (error2) {
          console.error("Erro ao buscar usuário:", error2);
        }
      };
      fetchSaldo();
      fetchUser();
    }
  }, [isOpen, userId, token, setLoadingSaldo, setSaldo]);
  const schema = Joi.object({
    valor: Joi.number().min(10).max(500).required().messages({
      "number.base": "Por favor, insira um valor válido.",
      "number.min": "O valor mínimo é R$10,00.",
      "number.max": "O valor máximo é R$500,00."
    })
  });
  const handleChange = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    const formattedValue = (Number(input) / 100).toFixed(2).replace(".", ",");
    setValor(formattedValue);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const parsedValor = parseFloat(valor.replace(",", "."));
    const { error: error2 } = schema.validate({ valor: parsedValor });
    if (error2) {
      setError(error2.message);
      return;
    }
    setError("");
    setLoading(true);
    const transactionData = {
      usuarioId: userId,
      eventoId: null,
      valor: parsedValor,
      moeda: "BRL",
      tipo: "adição de saldo",
      descricao: "Adição de saldo via frontend",
      status: "pendente"
    };
    try {
      const apiUrl = "http://18.216.192.230/api";
      if (!apiUrl) ;
      const response = await axios.post(`${apiUrl}/transactions`, transactionData, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      y.success(response.data.message);
      setLoading(false);
      onRequestClose();
    } catch (error3) {
      console.error("Erro ao adicionar saldo:", error3);
      y.error("Erro ao adicionar saldo. Tente novamente.");
      setLoading(false);
    }
  };
  const toggleShowSaldo = () => {
    setShowSaldo(!showSaldo);
  };
  if (loadingUser) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SaldoLoader, {});
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      isOpen,
      onRequestClose,
      className: "adicionar-saldo-modal",
      children: loadingSaldo ? /* @__PURE__ */ jsxRuntimeExports.jsx(SaldoLoader, {}) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal-content", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-button", onClick: onRequestClose, children: "X" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "saldo-info", children: [
          "Olá ",
          userDisplayName,
          ", seu saldo atual é de:"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "saldo-container", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "saldo-valor", children: [
            "R$ ",
            showSaldo ? `${saldo}` : "***,**"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "toggle-saldo-button", onClick: toggleShowSaldo, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: showSaldo ? olhoAberto : olhoFechado, alt: "Toggle Saldo" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "form-label", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "valor-label", htmlFor: "valor", children: "Valor a adicionar:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "valor-input-container", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "valor-prefixo", children: "R$" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                id: "valor",
                className: "valor-input",
                value: valor,
                onChange: handleChange,
                placeholder: "00,00"
              }
            )
          ] }),
          error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "error-message", children: error }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "submit-button", disabled: loading, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScaleLoader, { color: "#EE7F43", height: 20, radius: 10, speedMultiplier: 1, width: 2 }) : "Adicionar saldo" })
        ] })
      ] })
    }
  );
};
export {
  AdicionarSaldo as default
};
