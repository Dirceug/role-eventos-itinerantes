import { u as useNavigate, r as reactExports, U as UserContext, j as jsxRuntimeExports } from "./index-BYsE5TuP.js";
import { J as Joi } from "./joi-browser.min-kMCwmLIL.js";
import { B as ButonGrande } from "./ButtonGrande-Db_Cxi8l.js";
import { L as LabelInput } from "./LabelInput-ot4nAqfJ.js";
import { c as createUserWithEmailAndPassword } from "./index-9ae71ce3-D9oYUShw.js";
import { a as auth } from "./firebase-DVtbj-5A.js";
const schema = Joi.object({
  displayName: Joi.string().pattern(/^[a-zA-Z]{3,} [a-zA-Z]{3,}$/).required().label("Nome").messages({
    "string.pattern.base": "{#label} deve conter nome e sobrenome, cada um com pelo menos 3 letras.",
    "string.empty": "{#label} não pode estar vazio.",
    "any.required": "{#label} é obrigatório."
  }),
  email: Joi.string().email({ tlds: { allow: false } }).required().label("Email").messages({
    "string.email": "{#label} deve ser um email válido.",
    "string.empty": "{#label} não pode estar vazio.",
    "any.required": "{#label} é obrigatório."
  }),
  password: Joi.string().min(8).max(64).pattern(/(?=.*[a-z])/).pattern(/(?=.*[A-Z])/).pattern(/(?=.*\d)/).pattern(/(?=.*[@$!%*?&])/).required().label("Senha").messages({
    "string.min": "{#label} deve ter pelo menos 8 caracteres.",
    "string.max": "{#label} deve ter no máximo 64 caracteres.",
    "string.pattern.base": "{#label} deve conter letras maiúsculas, minúsculas, números e caracteres especiais.",
    "string.empty": "{#label} não pode estar vazio.",
    "any.required": "{#label} é obrigatório."
  }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().label("Repetir Senha").messages({
    "any.only": "As senhas não coincidem.",
    "string.empty": "{#label} não pode estar vazio.",
    "any.required": "{#label} é obrigatório."
  }),
  cpf: Joi.string().pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/).required().label("CPF").messages({
    "string.pattern.base": "{#label} deve estar no formato 123.456.789-10.",
    "string.empty": "{#label} não pode estar vazio.",
    "any.required": "{#label} é obrigatório."
  }),
  apelido: Joi.string().min(3).allow("").label("Apelido").messages({
    "string.min": "{#label} deve ter pelo menos 3 caracteres."
  })
});
function RegistrarUsuario() {
  const navigate = useNavigate();
  const { setUser } = reactExports.useContext(UserContext);
  const [displayName, setDisplayName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [confirmPassword, setConfirmPassword] = reactExports.useState("");
  const [cpf, setCpf] = reactExports.useState("");
  const [apelido, setApelido] = reactExports.useState("");
  const [errors, setErrors] = reactExports.useState({});
  const validate = () => {
    const result = schema.validate({ displayName, email, password, confirmPassword, cpf, apelido }, { abortEarly: false });
    if (!result.error) {
      setErrors({});
      return true;
    }
    const newErrors = {};
    for (let item of result.error.details) {
      newErrors[item.path[0]] = item.message;
    }
    setErrors(newErrors);
    return false;
  };
  const handleNext = async () => {
    if (!validate()) return;
    try {
      const firebaseResult = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = firebaseResult.user;
      console.log("Usuário registrado no Firebase:", firebaseUser);
      const idToken = await firebaseUser.getIdToken();
      const apiUrl = "http://localhost:5000/api";
      if (!apiUrl) ;
      console.log("API_URL:", apiUrl);
      const response = await fetch(`${apiUrl}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${idToken}`
          // Enviar o token no cabeçalho
        },
        body: JSON.stringify({
          displayName,
          email,
          cpf,
          apelido,
          firebaseUid: firebaseUser.uid,
          // UID do Firebase
          emailVerified: firebaseUser.emailVerified,
          isAnonymous: firebaseUser.isAnonymous
        })
      });
      if (response.ok) {
        const userData = await response.json();
        console.log("Usuário registrado no backend:", userData);
        setUser(userData);
        navigate("/login");
      } else {
        const errorData = await response.json();
        console.error("Erro ao registrar usuário no backend:", errorData);
      }
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        console.error("Erro: O e-mail já está em uso.");
        alert("Esse e-mail já está registrado. Tente fazer login ou usar outro e-mail.");
        toast.error("Esse e-mail já está registrado. Tente fazer login ou usar outro e-mail.");
      } else {
        console.error("Erro ao registrar usuário:", error);
      }
    }
  };
  const maskCPF = (value) => {
    return value.replace(/\D/g, "").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "paginaCadastro", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "tituloLogin", children: "Cadastrar Usuário" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "cinquentaPorCento", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        LabelInput,
        {
          label: "Nome:",
          type: "text",
          placeholder: "Nome",
          value: displayName,
          onChange: (e) => setDisplayName(e.target.value),
          error: errors.displayName
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        LabelInput,
        {
          label: "Email:",
          type: "email",
          placeholder: "nome@email.com",
          value: email,
          onChange: (e) => setEmail(e.target.value),
          error: errors.email
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        LabelInput,
        {
          label: "Senha:",
          type: "password",
          placeholder: "********",
          value: password,
          onChange: (e) => setPassword(e.target.value),
          error: errors.password
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        LabelInput,
        {
          label: "Repetir Senha:",
          type: "password",
          placeholder: "********",
          value: confirmPassword,
          onChange: (e) => setConfirmPassword(e.target.value),
          error: errors.confirmPassword
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        LabelInput,
        {
          label: "CPF:",
          type: "text",
          placeholder: "123.456.789-10",
          value: cpf,
          onChange: (e) => setCpf(e.target.value),
          error: errors.cpf,
          mask: maskCPF
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        LabelInput,
        {
          label: "Apelido (opcional):",
          type: "text",
          placeholder: "Apelido",
          value: apelido,
          onChange: (e) => setApelido(e.target.value),
          error: errors.apelido
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ButonGrande, { onClick: handleNext, className: "invertido", children: "Registrar Usuário" })
  ] });
}
export {
  RegistrarUsuario as default
};
