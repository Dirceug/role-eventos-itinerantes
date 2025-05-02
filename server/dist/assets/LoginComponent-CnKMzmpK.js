import { u as useNavigate, r as reactExports, U as UserContext, j as jsxRuntimeExports, b as api } from "./index-CWX6cuis.js";
import { a as auth, g as googleProvider, f as facebookProvider } from "./firebase-C86Ry2b6.js";
import { a as signInWithPopup } from "./index-e84cf44d-C0APv3cj.js";
/* empty css                        */
import { B as ButonGrande } from "./ButtonGrande-D7WhkQcb.js";
function LoginComponent() {
  const navigate = useNavigate();
  const { setUser } = reactExports.useContext(UserContext);
  const handleGoogleLogin = async () => {
    console.log("Iniciando login com Google...");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("Usuário autenticado com Google:", user);
      const idToken = await user.getIdToken();
      console.log("Token JWT obtido:", idToken);
      api.set("authToken", idToken);
      const apiUrl = "http://52.14.179.20";
      if (!apiUrl) ;
      const response = await fetch(`${apiUrl}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${idToken}`
        },
        body: JSON.stringify({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          firebaseUid: user.uid,
          emailVerified: user.emailVerified,
          isAnonymous: user.isAnonymous
        })
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Usuário registrado no backend:", data);
        setUser(data);
        navigate("/usuarios");
      } else {
        console.error("Erro ao salvar usuário no backend:", data);
      }
    } catch (error) {
      console.error("Erro durante login com Google:", error);
    }
  };
  const handleFacebookLogin = async () => {
    console.log("Iniciando login com Facebook...");
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;
      console.log("Usuário autenticado com Facebook:", user);
      const idToken = await user.getIdToken();
      console.log("Token JWT obtido:", idToken);
      api.set("authToken", idToken);
      const apiUrl = "http://52.14.179.20";
      if (!apiUrl) ;
      const response = await fetch(`${apiUrl}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${idToken}`
        },
        body: JSON.stringify({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          firebaseUid: user.uid,
          emailVerified: user.emailVerified,
          isAnonymous: user.isAnonymous
        })
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Usuário registrado no backend:", data);
        setUser(data);
        navigate("/usuarios");
      } else {
        console.error("Erro ao salvar usuário no backend:", data);
      }
    } catch (error) {
      console.error("Erro durante login com Facebook:", error);
    }
  };
  const navigateToSignup = () => {
    navigate("/logincomemail");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "login", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ButonGrande, { onClick: handleGoogleLogin, className: "social-button", children: "Entrar com Google" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ButonGrande, { onClick: handleFacebookLogin, className: "social-button", children: "Entrar com Facebook" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ButonGrande, { onClick: navigateToSignup, className: "social-button", children: "Entrar com e-mail" })
  ] });
}
export {
  LoginComponent as default
};
