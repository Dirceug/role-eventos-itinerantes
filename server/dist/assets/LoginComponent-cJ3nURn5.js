import { u as useNavigate, r as reactExports, U as UserContext, j as jsxRuntimeExports } from "./index-Dwuq2f-n.js";
import "./firebase-DUnIzicH.js";
import "./index-9ae71ce3-BWNZJcxD.js";
/* empty css                        */
import { B as ButonGrande } from "./ButtonGrande-C52D5qLu.js";
function LoginComponent() {
  const navigate = useNavigate();
  const { setUser } = reactExports.useContext(UserContext);
  const navigateToSignup = () => {
    navigate("/logincomemail");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "login", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ButonGrande, { className: "social-button", children: "Entrar com Google (em desenvolvimento)" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ButonGrande, { className: "social-button", children: "Entrar com Facebook (em desenvolvimento)" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ButonGrande, { onClick: navigateToSignup, className: "social-button", children: "Entrar com e-mail" })
  ] });
}
export {
  LoginComponent as default
};
