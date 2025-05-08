import { u as useNavigate, r as reactExports, U as UserContext, j as jsxRuntimeExports } from "./index-Cc20aRZ1.js";
import "./firebase-BdlwkAmq.js";
import "./index-9ae71ce3-BWNZJcxD.js";
/* empty css                        */
import { B as ButonGrande } from "./ButtonGrande-Dnt8ytPj.js";
function LoginComponent() {
  const navigate = useNavigate();
  const { setUser } = reactExports.useContext(UserContext);
  const navigateToSignup = () => {
    navigate("/logincomemail");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "login", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ButonGrande, { onClick: navigateToSignup, className: "social-button", children: "Entrar com e-mail" }) });
}
export {
  LoginComponent as default
};
