import { r as reactExports, j as jsxRuntimeExports, b as api } from "./index-CWX6cuis.js";
import { M as Modal } from "./index-DC4gqTGo.js";
Modal.setAppElement("#root");
const GerenciarResponsaveisModal = ({ isOpen, onRequestClose, eventId, organizadores }) => {
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const [users, setUsers] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const fetchUsers = async (query) => {
    if (query.length !== 5) {
      return;
    }
    setLoading(true);
    try {
      const token = api.get("authToken");
      const response = await fetch(`${"http://52.14.179.20"}/users/search?identifier=${query}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await response.json();
      setUsers(data || []);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleInativarOrganizador = async (organizadorId) => {
    try {
      const token = api.get("authToken");
      await fetch(`${"http://52.14.179.20"}/events/${eventId}/organizadores/${organizadorId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      alert("Organizador inativado com sucesso.");
      onRequestClose();
    } catch (error) {
      console.error("Erro ao inativar organizador:", error);
    }
  };
  const handleAdicionarOrganizador = async (user) => {
    const novoOrganizador = {
      nome: user.displayName,
      email: user.email,
      fotoUrl: user.photoURL,
      uid: user.identifier,
      status: "Ativo"
    };
    try {
      const token = api.get("authToken");
      await fetch(`${"http://52.14.179.20"}/events/${eventId}/organizadores`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ organizadores: [novoOrganizador] })
      });
      alert("Organizador adicionado com sucesso.");
      onRequestClose();
    } catch (error) {
      console.error("Erro ao adicionar organizador:", error);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      isOpen,
      onRequestClose,
      className: "full-screen-modal",
      overlayClassName: "modal-overlay",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal-content", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-button orange", onClick: onRequestClose, children: "X" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Gerenciar Responsáveis" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Responsáveis Ativos" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { children: organizadores.filter((o) => o.status === "Ativo").map((organizador, index, array) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Nome:" }),
            " ",
            organizador.nome,
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Email:" }),
            " ",
            organizador.email
          ] }),
          array.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleInativarOrganizador(organizador._id), children: "Apagar Organizador" })
        ] }, organizador._id)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Adicionar Novo Responsável" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: searchTerm,
            onChange: (e) => {
              const query = e.target.value.trim();
              setSearchTerm(query);
              fetchUsers(query);
            },
            placeholder: "Digite o identificador do usuário"
          }
        ),
        loading && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Carregando..." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { children: users.map((user) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Nome:" }),
            " ",
            user.displayName,
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Email:" }),
            " ",
            user.email,
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {})
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              disabled: !user.emailVerified,
              onClick: () => handleAdicionarOrganizador(user),
              children: "Tornar este usuário administrador"
            }
          )
        ] }, user._id)) })
      ] })
    }
  );
};
export {
  GerenciarResponsaveisModal as default
};
