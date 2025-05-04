import { u as useNavigate, j as jsxRuntimeExports } from "./index-Chp7mPQo.js";
/* empty css                        */
import { B as ButonGrande } from "./ButtonGrande-B2aAx_Si.js";
function LoginComponent() {
  const navigate = useNavigate();
  const handleCognitoLogin = () => {
    const cognitoDomain = void 0;
    const clientId = void 0;
    const redirectUri = void 0;
    const authUrl = `${cognitoDomain}/login?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=openid email profile`;
    window.location.href = authUrl;
  };
  const navigateToSignup = () => {
    navigate("/logincomemail");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "login", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ButonGrande, { onClick: handleCognitoLogin, className: "social-button", children: "Entrar com Cognito" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ButonGrande, { onClick: navigateToSignup, className: "social-button", children: "Entrar com e-mail" })
  ] });
}
export {
  LoginComponent as default
};
