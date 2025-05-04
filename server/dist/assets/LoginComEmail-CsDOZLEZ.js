import { u as useNavigate, r as reactExports, j as jsxRuntimeExports, b as api } from "./index-Cj7anpas.js";
import { B as ButonGrande } from "./ButtonGrande-CcglwEt7.js";
/* empty css               */
/* empty css                        */
import { L as LabelInput } from "./LabelInput-DA33gonl.js";
import { s as signInWithEmailAndPassword } from "./index-e84cf44d-BcL1Y4JN.js";
import { a as auth } from "./firebase-BLyn2qNx.js";
function AuthEmailPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const handleEmailLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password).then((result) => {
      api.set("authToken", result.user.accessToken);
      navigate("/usuarios");
    }).catch((error) => {
      console.error(error);
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "paginaCadastro", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "tituloLogin", children: "Login" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LabelInput, { label: "E-mail: ", type: "text", placeholder: "nome@email.com", value: email, onChange: (e) => setEmail(e.target.value) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LabelInput, { label: "Senha: ", type: "password", placeholder: "**********", value: password, onChange: (e) => setPassword(e.target.value) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ButonGrande, { onClick: handleEmailLogin, className: "invertido", children: "Login" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ButonGrande, { onClick: () => navigate("/cadastro/registrarusuario"), className: "invertido", children: "Cadastrar Usuário" })
  ] });
}
export {
  AuthEmailPassword as default
};
