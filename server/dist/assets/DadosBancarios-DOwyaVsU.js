import { u as useNavigate, r as reactExports, j as jsxRuntimeExports, b as api } from "./index-Chp7mPQo.js";
import { L as LabelInput } from "./LabelInput-CGY0_ZeZ.js";
import { B as ButonGrande } from "./ButtonGrande-B2aAx_Si.js";
/* empty css               */
function AtualizarDadosBancarios() {
  const navigate = useNavigate();
  const [banco, setBanco] = reactExports.useState({
    numeroBanco: "",
    nomeBanco: "",
    tipoConta: "",
    numeroConta: "",
    digitoConta: "",
    numeroAgencia: "",
    digitoAgencia: "",
    chavePIX: ""
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBanco((prevBanco) => ({
      ...prevBanco,
      [name]: value
    }));
  };
  const handleNext = async () => {
    try {
      const token = api.get("authToken");
      const response = await fetch("${process.env.REACT_APP_API_URL}/users/updateBankDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
          // Adicionar o token de autenticação ao cabeçalho da requisição
        },
        body: JSON.stringify(banco)
      });
      if (response.ok) {
        navigate("/cadastro/confirmacao");
      } else {
        console.error("Erro ao atualizar dados bancários");
      }
    } catch (error) {
      console.error("Erro ao atualizar dados bancários:", error);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "paginaCadastro", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Registro de Dados Bancários" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "cinquentaPorCento", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LabelInput, { label: "Número do Banco:", type: "text", name: "numeroBanco", placeholder: "000", value: banco.numeroBanco, onChange: handleChange }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LabelInput, { label: "Nome do Banco:", type: "text", name: "nomeBanco", placeholder: "Nome do Banco", value: banco.nomeBanco, onChange: handleChange }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LabelInput, { label: "Tipo de Conta:", type: "text", name: "tipoConta", placeholder: "Corrente/Poupança", value: banco.tipoConta, onChange: handleChange }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LabelInput, { label: "Número da Conta:", type: "text", name: "numeroConta", placeholder: "00000-0", value: banco.numeroConta, onChange: handleChange }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LabelInput, { label: "Dígito da Conta:", type: "text", name: "digitoConta", placeholder: "0", value: banco.digitoConta, onChange: handleChange }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LabelInput, { label: "Número da Agência:", type: "text", name: "numeroAgencia", placeholder: "0000", value: banco.numeroAgencia, onChange: handleChange }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LabelInput, { label: "Dígito da Agência:", type: "text", name: "digitoAgencia", placeholder: "0", value: banco.digitoAgencia, onChange: handleChange }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LabelInput, { label: "Chave PIX:", type: "text", name: "chavePIX", placeholder: "Chave PIX", value: banco.chavePIX, onChange: handleChange })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ButonGrande, { onClick: handleNext, className: "invertido", children: "Finalizar Cadastro" })
  ] });
}
export {
  AtualizarDadosBancarios as default
};
