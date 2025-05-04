const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Navbar-DXsSPmEa.js","assets/index-Cj7anpas.js","assets/index-BIH4TKpF.css","assets/index-e84cf44d-BcL1Y4JN.js","assets/Navbar-DjX9SrpG.css"])))=>i.map(i=>d[i]);
import { r as reactExports, U as UserContext, j as jsxRuntimeExports, b as api, _ as __vitePreload } from "./index-Cj7anpas.js";
import { l as lodashExports } from "./lodash-dhPqV2gM.js";
const Navbar = reactExports.lazy(() => __vitePreload(() => import("./Navbar-DXsSPmEa.js"), true ? __vite__mapDeps([0,1,2,3,4]) : void 0));
const Usuarios = () => {
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const [users, setUsers] = reactExports.useState([]);
  const [suggestions, setSuggestions] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [message, setMessage] = reactExports.useState("");
  const { user } = reactExports.useContext(UserContext);
  const fetchUsers = async (query) => {
    if (query.length < 2) {
      setMessage("Digite pelo menos 2 caracteres para buscar.");
      setUsers([]);
      setSuggestions([]);
      return;
    }
    setLoading(true);
    setMessage("");
    try {
      const token = api.get("authToken");
      const response = await fetch(`${"http://52.14.179.20"}/users/search?identifier=${query}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data) {
        setUsers([data]);
        setSuggestions([]);
        if (query.length === 5) {
          setMessage("Busca por correspondência exata.");
        }
      } else {
        setUsers([]);
        setMessage("Nenhum usuário encontrado.");
      }
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      setMessage("Erro ao buscar usuários.");
    } finally {
      setLoading(false);
    }
  };
  const fetchSuggestions = async (query) => {
    if (query.length >= 2) {
      setLoading(true);
      try {
        const token = api.get("authToken");
        const response = await fetch(`${"http://52.14.179.20"}/users/search?identifier=${query}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (data) {
          setSuggestions([data]);
        }
      } catch (error) {
        console.error("Erro ao buscar sugestões:", error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }
  };
  const debouncedFetchUsers = reactExports.useCallback(
    lodashExports.debounce((query) => fetchUsers(query), 2e3),
    []
  );
  const handleInputChange = (event) => {
    const query = event.target.value.trim();
    setSearchTerm(query);
    if (query.length >= 2) {
      fetchSuggestions(query);
      debouncedFetchUsers(query);
    } else {
      setSuggestions([]);
      setUsers([]);
      setMessage("Digite pelo menos 2 caracteres para buscar.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Carregando..." }), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, { user }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "users-container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "titulo", children: "Busca de Usuários" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          value: searchTerm,
          onChange: handleInputChange,
          placeholder: "Digite o código do usuário",
          className: "search-input"
        }
      ),
      loading && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Carregando..." }),
      message && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "message", children: message }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "resultado", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Resultados:" }),
        users.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { children: users.map((user2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "parametros", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "detalhes", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Nome:" }),
            " ",
            user2.displayName,
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Email:" }),
            " ",
            user2.email,
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {})
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "photo", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: user2.photoURL,
              alt: user2.displayName,
              className: "user-photo"
            }
          ) })
        ] }, user2._id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Nenhum usuário encontrado." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: suggestions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Sugestões:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { children: suggestions.map((user2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Nome:" }),
          " ",
          user2.displayName,
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Email:" }),
          " ",
          user2.email
        ] }, user2._id)) })
      ] }) })
    ] })
  ] });
};
export {
  Usuarios as default
};
