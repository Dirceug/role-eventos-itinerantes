import { u as useNavigate, r as reactExports, U as UserContext, j as jsxRuntimeExports, b as api } from "./index-D8RQZEZ7.js";
import { a as auth, g as googleProvider, f as facebookProvider } from "./firebase-DVtbj-5A.js";
import { a as signInWithPopup } from "./index-9ae71ce3-D9oYUShw.js";
/* empty css                        */
import { B as ButonGrande } from "./ButtonGrande-DC_B4K1O.js";
const saveToken = (token) => {
  sessionStorage.setItem("authToken", token);
  localStorage.setItem("authToken", token);
  api.set("authToken", token, { secure: true, sameSite: "Strict" });
  console.log("Token salvo em sessionStorage, localStorage e Cookies.");
};
function LoginComponent() {
  const navigate = useNavigate();
  const { setUser } = reactExports.useContext(UserContext);
  const handleGoogleLogin = async () => {
    console.log("Iniciando login com Google...");
    let popupMonitor = null;
    try {
      popupMonitor = setInterval(() => {
        if (!auth.currentUser) {
          console.warn("O popup pode ter sido fechado antes de concluir o login.");
        }
      }, 1e3);
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Popup aberto com sucesso.");
      const user = result.user;
      console.log("Usuário autenticado com Google:", user);
      const idToken = await user.getIdToken();
      console.log("Token JWT obtido:", idToken);
      saveToken(idToken);
      const apiUrl = "http://18.216.192.230";
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
      if (popupMonitor) clearInterval(popupMonitor);
      console.error("Erro durante login com Google:", error);
      if (error.code === "auth/popup-closed-by-user") {
        console.warn("O popup foi fechado pelo usuário antes de concluir o login.");
      } else {
        console.error("Erro inesperado durante login com Google:", error);
      }
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
      saveToken(idToken);
      const apiUrl = "http://18.216.192.230";
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
      if (error.message.includes("Cross-Origin-Opener-Policy")) {
        console.error("Erro relacionado à política COOP/COEP. Verifique as configurações do servidor.");
      }
    }
  };
  const navigateToSignup = () => {
    navigate("/logincomemail");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "login", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ButonGrande, { onClick: handleGoogleLogin, className: "social-button", children: "Entrar com Google (em desenvolvimento)" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ButonGrande, { onClick: handleFacebookLogin, className: "social-button", children: "Entrar com Facebook (em des)" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ButonGrande, { onClick: navigateToSignup, className: "social-button", children: "Entrar com e-mail" })
  ] });
}
export {
  LoginComponent as default
};
