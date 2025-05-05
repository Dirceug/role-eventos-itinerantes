import { u as useNavigate, r as reactExports, j as jsxRuntimeExports, b as api } from "./index-D8RQZEZ7.js";
import { B as ButonGrande } from "./ButtonGrande-DC_B4K1O.js";
/* empty css               */
/* empty css                        */
import { L as LabelInput } from "./LabelInput-CMS4RrYe.js";
import { s as signInWithEmailAndPassword } from "./index-9ae71ce3-D9oYUShw.js";
import { a as auth } from "./firebase-DVtbj-5A.js";
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
